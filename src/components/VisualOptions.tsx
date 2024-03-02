import React, { useCallback, useState } from "react";
import type { StringInputProps } from "sanity";
import { set } from "sanity";
import { Dialog, Text, Card, Box, Grid, Tooltip } from "@sanity/ui";
import styled from "styled-components";
import { ExpandIcon } from "@sanity/icons";

type OptionListItem = {
  title: string;
  value: string;
  image: string;
  tooltip?: string;
};

interface ListItemProps {
  data: OptionListItem;
  selected: boolean;
  aspectRatio: number;
  onZoom: (item: OptionListItem, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelect: (value: string) => void;
}

type SchemaTypeOption =
  | {
      list: OptionListItem[];
      aspectRatio?: number;
      columns?: number;
    }
  | undefined;

const ListItem = ({ selected, data, onZoom, onSelect, aspectRatio }: ListItemProps) => {
  const { tooltip, value, title, image } = data;
  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text align="center" size={1}>
            {tooltip}
          </Text>
        </Box>
      }
      placement="top"
      portal
      disabled={!tooltip}
    >
      <ItemWrapper
        tone={selected ? "primary" : "default"}
        shadow={selected ? 1 : 0}
        padding={[2]}
        radius={2}
        onClick={() => onSelect(value)}
      >
        <StyledImg src={image} $aspectRatio={aspectRatio} />
        <Text align="center" size={1}>
          {title}
        </Text>
        <button className="zoom" onClick={(e) => onZoom(data, e)}>
          <ExpandIcon style={{ fontSize: 25 }} />
        </button>
      </ItemWrapper>
    </Tooltip>
  );
};

const VisualOptions = ({ schemaType, onChange, value: inputValue = "" }: StringInputProps) => {
  const options = schemaType.options as SchemaTypeOption;
  const list = options?.list ?? [];
  const aspectRatio = options?.aspectRatio ?? 1;
  const columns = options?.columns ?? 4;
  const [zoomImage, setZoomImage] = useState<OptionListItem | null>(null);

  const handleSelect = useCallback(
    (val: string) => {
      if (val && inputValue !== val) {
        onChange(set(val));
      }
    },
    [onChange, inputValue],
  );

  const handleZoom = (img: OptionListItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setZoomImage(img);
  };

  return (
    <Card padding={[2]} shadow={1}>
      <Grid columns={[2, 2, columns]} gap={[1, 1, 2, 2]} padding={1}>
        {list.map((item) => (
          <ListItem
            selected={inputValue === item.value}
            data={item}
            key={item.value}
            aspectRatio={aspectRatio}
            onZoom={handleZoom}
            onSelect={handleSelect}
          />
        ))}
      </Grid>
      {zoomImage && (
        <StyledDialog
          header={zoomImage.title}
          id="dialog-example"
          onClose={() => setZoomImage(null)}
          zOffset={1000}
          width={1}
        >
          <Box padding={4} className="content">
            <img src={zoomImage.image} />
          </Box>
        </StyledDialog>
      )}
    </Card>
  );
};

export default VisualOptions;

const StyledImg = styled.img<{ $aspectRatio: number }>`
  width: 100%;
  border-radius: 3px;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  object-fit: cover;
  margin-bottom: 6px;
`;

const StyledDialog = styled(Dialog)`
  .content {
    display: flex;

    img {
      max-height: 400px;
      max-width: 100%;
      margin: 0 auto;
      object-fit: contain;
    }
  }
`;

const ItemWrapper = styled(Card)`
  cursor: pointer;
  position: relative;

  &:hover {
    .zoom {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .zoom {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    margin: 0;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;

    svg {
      display: block;
    }
  }
`;
