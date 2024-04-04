import { BaseSchemaType, InitialValueProperty, StringDefinition, StringInputProps } from "sanity";

export type ImageOptionsListItem = {
  title: string;
  value: string;
  image: string;
  tooltip?: string;
};

export interface ImageOptionsOpts {
  /** Aspect Ratio for the image inside the card (Optional, default to 1) */
  aspectRatio?: number;
  /**Number of options per row (Optional, default to 4) */
  columns?: number;
  /** List of options */
  list: ImageOptionsListItem[];
}

export type ImageOptionsDefinition = Omit<StringDefinition, "type" | "options"> & {
  type: "imageOptions";
  options: ImageOptionsOpts;
};

interface ImageOptionsSchemaType extends BaseSchemaType {
  jsonType: "string";
  options: ImageOptionsOpts;
  initialValue?: InitialValueProperty<undefined, string>;
}

export type ImageOptionsProps = StringInputProps<ImageOptionsSchemaType>;

declare module "@sanity/types" {
  export interface IntrinsicDefinitions {
    imageOptions: ImageOptionsDefinition;
  }
}
