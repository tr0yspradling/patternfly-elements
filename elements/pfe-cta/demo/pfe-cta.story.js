import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeCta from "../dist/pfe-cta";

const stories = storiesOf("Call to action", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCta.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeCta.tag, () => {
  let config = {};

  const props = PfeCta.properties;
  props.priority.default = "primary";

  // Pull out variant
  // let priority = props.priority;
  let color = props.color;
  let variant = props.variant;
  // Remove it from the options list
  delete props.variant;
  delete props.color;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  if (config.prop["pfe-priority"] === "secondary") {
    // Add back variant options
    props.variant = variant;
  }

  // Rerender select boxes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  if (
    !(
      config.prop["pfe-priority"] === "secondary" &&
      config.prop["pfe-variant"] === "wind"
    )
  ) {
    // Add back colors
    props.color = color;
  }

  // Rerender select boxes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const slots = PfeCta.slots;

  //-- Add default content to slot objects
  // Build the default text content
  slots.text = {
    title: "Link text",
    default: "Become a member"
  };

  // Build the default link content
  slots.link.title = "URL";
  slots.link.default = "https://www.redhat.com";

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "a",
        attributes: {
          href: config.has.link
        },
        content: config.has.text
      })
    }
  ];

  const render = template(config);
  return tools.preview(render);
});

stories.add("At a glance", () => {
  return `
  <style>
    div {
      margin-bottom: 40px;
    }

    pfe-cta {
      margin-right: 10px;
    }
  </style>
  <section>
    <h2>At a glance</h2>
    <div>
      <h3>Defaults</h3>
      <pfe-cta><a href="#">Default</a></pfe-cta>
      <pfe-cta pfe-priority="primary"><a href="#">Primary</a></pfe-cta>
      <pfe-cta pfe-priority="secondary"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Complement</h3>
      <pfe-cta pfe-color="complement"><a href="#">Default</a></pfe-cta>
      <pfe-cta pfe-priority="primary" pfe-color="complement"><a href="#">Primary</a></pfe-cta>
      <pfe-cta pfe-priority="secondary" pfe-color="complement"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Accent</h3>
      <pfe-cta pfe-color="accent"><a href="#">Default</a></pfe-cta>
      <pfe-cta pfe-priority="primary" pfe-color="accent"><a href="#">Primary</a></pfe-cta>
      <pfe-cta pfe-priority="secondary" pfe-color="accent"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Base</h3>
      <pfe-cta pfe-color="base"><a href="#">Default</a></pfe-cta>
      <pfe-cta pfe-priority="primary" pfe-color="base"><a href="#">Primary</a></pfe-cta>
      <pfe-cta pfe-priority="secondary" pfe-color="base"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div style="background:#333;padding:20px">
      <h3 style="color:#fff">Color: Lightest</h3>
      <pfe-cta pfe-priority="primary" pfe-color="lightest"><a href="#">Primary</a></pfe-cta>
    </div>
  </section>
  `;
});
