import { Extension } from "@tiptap/core";

export const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],

        attributes: {
          fontSize: {
            default: null,

            parseHTML: (element) =>
              element.style.fontSize || null,

            renderHTML: (attributes) => {

              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };

            },
          },

          fontFamily: {
            default: null,

            parseHTML: (element) =>
              element.style.fontFamily || null,

            renderHTML: (attributes) => {

              if (!attributes.fontFamily) {
                return {};
              }

              return {
                style: `font-family: ${attributes.fontFamily}`,
              };

            },
          },
        },
      },
    ];
  },
});