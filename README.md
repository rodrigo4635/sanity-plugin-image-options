# Image Options Input for Sanity

> This is a **Sanity Studio v3** plugin.

A string selection input with images, labels and tooltips. The user can also click the Expand icon to view the image in an expanded dialog box

List of options, with 4 columns and Dark Theme:

![Example 1](https://github.com/rodrigo4635/sanity-plugin-image-options/blob/main/images/image1.png?raw=true)

List of options, with 3 columns and Light Theme:

![Example 2](https://github.com/rodrigo4635/sanity-plugin-image-options/blob/main/images/image2.png?raw=true)

Expanded image:

![Example 3](https://github.com/rodrigo4635/sanity-plugin-image-options/blob/main/images/image3.png?raw=true)

## Installation

```sh
npm install sanity-plugin-image-options
```

or

```sh
yarn add sanity-plugin-image-options
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from "sanity";
import { imageOptions } from "sanity-plugin-image-options";

export default defineConfig({
  //...
  plugins: [
    //...
    imageOptions(),
  ],
});
```

Now you can use as a normal schema type in your project:

```ts
import img1 from "./img1.svg";
import img3 from "./img3.png";
import img4 from "./img4.jpg";

export default defineType({
  name: "page",
  type: "document",
  fields: [
    defineField({
      name: "options",
      type: "imageOptions",
      options: {
        columns: 3, // Number of options per row (Optional, default to 4)
        aspectRatio: 1, // Aspect Ratio for the image inside the card (Optional, default to 1)
        list: [
          { value: "1", title: "Option 1", image: img1, tooltip: "Example tooltip message" },
          { value: "2", title: "Option 2 without tooltip", image: "https://.../img2.png" },
          { value: "3", title: "Option 3", image: img3 },
          { value: "4", title: "Option 4", image: img4 },
        ],
      },
    }),
  ],
});
```

### Schema options object

| Key            | Type             | Description                                                                     |
| -------------- | ---------------- | ------------------------------------------------------------------------------- |
| `columns`      | Number           | Number of options per row (Optional, default to 4)                              |
| `aspectRatio`  | Number           | Aspect Ratio for the image inside the card (Optional, default to 1)             |
| `list`         | Array of objects | List of options                                                                 |
| **List Item:** |                  |                                                                                 |
| `value`        | String           | Option value                                                                    |
| `title`        | String           | Title to be displayed below the image (if not set, it will be "Option {index}") |
| `image`        | String           | Image for the src image prop, can be a local or external image                  |
| `tooltip`      | String           | Optional tooltip message to show on hover                                       |

## License

[MIT](LICENSE) © Rodrigo Pasini de Souza

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
