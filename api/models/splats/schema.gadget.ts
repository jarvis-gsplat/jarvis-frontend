import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "splats" model, go to https://jarvis-vision.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "QOHeuwAQ7TRS",
  fields: {
    img: { type: "string", storageKey: "HDX08afrVwB4" },
    title: {
      type: "string",
      default: "unau",
      storageKey: "uHI6HMS-lbKv",
    },
    url: { type: "string", storageKey: "dupWSDwd04Ln" },
    username: { type: "string", storageKey: "9ghCGYvU0H8y" },
  },
};
