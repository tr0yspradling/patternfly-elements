import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import "../dist/pfe-avatar";
import { escapeHTML } from "../../../.storybook/utils.js";

const stories = storiesOf("Avatar", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(withKnobs);

stories.add("pfe-avatar", () => {
  const name = text("Name", "Apple Cinnamon");
  const pattern = select("Pattern", ["triangles", "squares"], "squares");
  const shape = select("Shape", ["default", "rounded", "circle"], "squares");
  const src = text("Image URL", "");

  const staticExamples = [
    {
      name: "Hannah Abbott",
      shape: "default",
      pattern: "squares"
    },
    {
      name: "Susan Bones",
      shape: "rounded",
      src:
        "data:image/png;base64,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"
    },
    {
      name: "Katie Bell",
      shape: "circle",
      src:
        "data:image/jpeg;base64,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"
    }
  ];

  const customAvatar = `<pfe-avatar pfe-shape="${shape}" pfe-pattern="${pattern}" pfe-name="${name}"${src &&
    ` pfe-src="${src}"`}></pfe-avatar>`;

  return `
    <h1>Dynamic example</h1>
    <h2>Use knobs to adjust!</h2>

    <link rel="stylesheet" type="text/css" href="/pfe-styles/dist/pfe-layouts.css">

    <div class="rh-l-bullseye">
      <div class="rh-l-bullseye__item">
      ${customAvatar}
      </div>
    </div>
    <section>
      <h2>Markup</h2>
      <pre style="margin-left:15px;"><code>${escapeHTML(customAvatar)}</code>
      </pre>
    </section>
    <h1>Static examples</h1>

    <style>
      .demo-cards {
        display: flex;
        flex-wrap: wrap;
      }

      pfe-card > h3 {
        margin: 0;
      }

      .demo-cards > pfe-card {
        margin: 0 16px 32px;
        width: 168px;
        box-sizing: content-box;
      }
    </style>

    <div class="demo-cards">
      ${staticExamples
        .map(
          ex => `
            <pfe-card pfe-color="lighter">
              <h3 slot="pfe-card--header">${ex.name}</h3>
              <pfe-avatar
                ${ex.src ? `pfe-src=${ex.src}` : `pfe-pattern="${ex.pattern}"`}
                pfe-shape="${ex.shape}"
                pfe-name="${ex.name}">
              </pfe-avatar>
              <p>Avatar for "${ex.name}" with ${
            ex.src ? `a user-selected image` : `patterned ${ex.pattern}`
          }, ${ex.shape} shape.</p>
            </pfe-card>
          `
        )
        .join("\n")}
    </div>
  `;
});
