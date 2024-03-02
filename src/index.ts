import { definePlugin, defineType } from "sanity";

import VisualOptions from "./components/VisualOptions";

interface ImageOptionsConfig {}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {imageOptions} from 'sanity-plugin-image-options'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *     //...
 *     imageOptions()
 *   ],
 * })
 * ```
 */
export const imageOptions = definePlugin<ImageOptionsConfig | void>(() => {
  // eslint-disable-next-line no-console
  console.log("hello from sanity-plugin-image-options");
  return {
    name: "sanity-plugin-image-options",
    schema: {
      types: [
        defineType({
          name: "imageOptions",
          type: "string",
          components: { input: VisualOptions },
        }),
      ],
    },
  };
});

imageOptions();
