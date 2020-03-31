import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeSelect from "../dist/pfe-select";

const stories = storiesOf("Select", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) => {
  return tools.component(PfeSelect.tag, data.prop, data.slots);
};

stories.add(PfeSelect.tag, () => {
  let config = {};

  let options = [];
  let appendOptions = {};
  let customOptions = {};

  let htmlOptions = "";

  const defaultOptions = [
    { text: "Please select an Option", value: "" },
    { text: "One", value: "1" },
    { text: "Two", value: "2" }
  ];

  const props = {
    invalid: {
      title: "pfe-invalid",
      type: "boolean",
      default: false,
      prefixed: true
    }
  };

  // Ask user if they want to add any custom options via pfeOptions setter method
  const isCustomOptions = storybookBridge.boolean(
    "Use custom options via pfeOptions setter?",
    false,
    "Content"
  );

  // Ask user if they want to append any options via addOptions API
  const isAppendOptions = storybookBridge.boolean(
    "Append custom options via addOptions API?",
    false,
    "API"
  );

  if (isCustomOptions) {
    const data = [];
    // Let the user determine number of options
    let optionsCount = storybookBridge.number(
      "Count",
      2,
      {
        min: 1,
        max: 10
      },
      "Content"
    );

    for (let i = 0; i < optionsCount; i++) {
      data[i] = { text: `Option ${i}`, value: `${i}`, selected: false };
    }
    customOptions = storybookBridge.object("Options", { data }, "Content");
  }

  if (isAppendOptions) {
    const data = [];
    // Let the user determine number of options
    let appendCount = storybookBridge.number(
      "Append Count",
      2,
      {
        min: 1,
        max: 10
      },
      "API"
    );

    for (let i = 0; i < appendCount; i++) {
      data[i] = { text: `Option ${i}`, value: `${i}`, selected: false };
    }
    appendOptions = storybookBridge.object("Options", { data }, "API");
  }

  // use customOptions if exist otherwise use defaultOptions
  options = isCustomOptions ? customOptions.data : defaultOptions;

  // concat appendOptions if user choose to append options
  if (isAppendOptions) {
    options = options.concat(appendOptions.data);
  }

  // build htmlOptions
  for (let i = 0; i < options.length; i++) {
    htmlOptions =
      htmlOptions +
      tools.customTag({
        tag: "option",
        attributes: {
          value: options[i].value,
          selected: options[i].selected ? "" : undefined
        },
        content: options[i].text
      });
  }

  config.prop = tools.autoPropKnobs(props, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "select",
        content: htmlOptions
      })
    }
  ];

  let rendered = template(config);
  return tools.preview(rendered);
});
