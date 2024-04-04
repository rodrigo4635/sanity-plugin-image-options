import "./types";

import { definePlugin, defineType } from "sanity";

import ImageOptions from "./ImageOptions";

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

export type { ImageOptionsDefinition, ImageOptionsListItem, ImageOptionsOpts } from "./types";
