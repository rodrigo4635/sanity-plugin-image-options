import { ExpandIcon } from "@sanity/icons";
import { Box, Text, Tooltip } from "@sanity/ui";
import React from "react";
import { StyledCard, StyledImg } from "./styles";
import { ImageOptionsListItem } from "./types";

interface ListItemProps {
  data: ImageOptionsListItem;
  selected: boolean;
  aspectRatio: number;
  index: number;
  onZoom: (e: React.MouseEvent<HTMLButtonElement>, item: ImageOptionsListItem) => void;
  onSelect: (value: string) => void;
}

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

  const handleZoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        <button type="button" className="zoom" onClick={handleZoom}>
          <ExpandIcon style={{ fontSize: 25 }} />
        </button>
      </StyledCard>
    </Tooltip>
  );
};

export default ListItem;
