import { definePlugin, defineType, StringDefinition } from "sanity";

import ImageOptions, { ImageOptionsOpts } from "./ImageOptions";

/** @public */
interface ImageOptionsDefinition extends Omit<StringDefinition, "type" | "options"> {
  type: "imageOptions";
  options: ImageOptionsOpts;
}

declare module "@sanity/types" {
  export interface IntrinsicDefinitions {
    imageOptions: ImageOptionsDefinition;
  }
}

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

export type { ImageOptionsDefinition, ImageOptionsOpts };
