import { definePlugin, defineType } from "sanity";
import ImageOptions from "./ImageOptions";
import "./types";

export const imageOptions = definePlugin<void>(() => {
  return {
    name: "sanity-plugin-image-options",
    schema: {
      types: [
        defineType({
          name: "imageOptions",
          type: "string",
          components: { input: ImageOptions },
        }),
      ],
    },
  };
});

export type { ImageOptionsDefinition, ImageOptionsOpts, ImageOptionsListItem } from "./types";
