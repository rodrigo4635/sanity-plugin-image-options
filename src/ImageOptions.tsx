import { Box, Card, Grid } from "@sanity/ui";
import React, { useCallback, useState } from "react";
import { set } from "sanity";
import ListItem from "./ListItem";
import { StyledDialog } from "./styles";
import { ImageOptionsListItem, ImageOptionsProps } from "./types";

const ImageOptions: React.FC<ImageOptionsProps> = ({
  schemaType,
  onChange,
  value: inputValue = "",
}) => {
  const options = schemaType?.options;
  const list = options?.list ?? [];
  const aspectRatio = options?.aspectRatio ?? 1;
  const columns = options?.columns ?? 4;
  const [zoomImage, setZoomImage] = useState<ImageOptionsListItem>();

  const handleSelect = useCallback(
    (val: string) => {
      if (inputValue !== val) {
        onChange(set(val));
      }
    },
    [onChange, inputValue],
  );

  const handleZoom = (e: React.MouseEvent<HTMLButtonElement>, img: ImageOptionsListItem) => {
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
          onClose={() => setZoomImage(undefined)}
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

export default ImageOptions;
