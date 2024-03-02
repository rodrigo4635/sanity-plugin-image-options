import { ExpandIcon } from "@sanity/icons";
import { Box, Card, Grid, Text, Tooltip } from "@sanity/ui";
import React, { useCallback, useState } from "react";
import type { StringInputProps } from "sanity";
import { set } from "sanity";

import { StyledCard, StyledDialog, StyledImg } from "./styles";

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
  index: number;
  onZoom: (e: React.MouseEvent<HTMLButtonElement>, item: OptionListItem) => void;
  onSelect: (value: string) => void;
}

type SchemaTypeOption =
  | {
      list: OptionListItem[];
      aspectRatio?: number;
      columns?: number;
    }
  | undefined;

const ListItem: React.FC<ListItemProps> = ({
  selected,
  data,
  onZoom,
  onSelect,
  aspectRatio,
  index,
}) => {
  const { tooltip, value, title, image } = data;

  const handleClick = () => {
    onSelect(value);
  };

  const handleZoomClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onZoom(e, data);
  };

  if (!image || !value) return null;
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
      arrow
      disabled={!tooltip}
    >
      <StyledCard
        tone={selected ? "primary" : "default"}
        shadow={selected ? 1 : 0}
        padding={[2]}
        radius={2}
        onClick={handleClick}
      >
        <StyledImg src={image} alt={title ?? "Image"} $aspectRatio={aspectRatio} />
        <Text align="center" size={1}>
          {title || `Option ${index + 1}`}
        </Text>
        <button type="button" className="zoom" onClick={handleZoomClick}>
          <ExpandIcon style={{ fontSize: 25 }} />
        </button>
      </StyledCard>
    </Tooltip>
  );
};

const VisualOptions: React.FC<StringInputProps> = ({
  schemaType,
  onChange,
  value: inputValue = "",
}) => {
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

  const handleZoom = (e: React.MouseEvent<HTMLButtonElement>, img: OptionListItem) => {
    e.stopPropagation();
    setZoomImage(img);
  };

  return (
    <Card padding={[2]} shadow={1}>
      <Grid columns={[2, 2, columns]} gap={[1, 1, 2, 2]} padding={1}>
        {list.map((item, index) => (
          <ListItem
            selected={inputValue === item.value}
            data={item}
            index={index}
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
