import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { configureViewport } from "@storybook/addon-viewport";
import "./rh-band";

const stories = storiesOf("Band", module);
stories.addDecorator(withKnobs);

stories.add("rh-band", () => {
  // Pointer to theme file
  const themeLabel = "Theme file";

  // Attributes
  const colorLabel = "Color";
  const colorOptions = {
    lightest: "lightest",
    light: "light",
    base: "base",
    dark: "dark",
    darkest: "darkest",
    complement: "complement",
    accent: "accent"
  };
  const colorDefault = "base";
  const colorValue = select(colorType, colorOptions, colorDefault);
  let colorAttr = colorValue != "base" ? ` color="${colorValue}"` : "";

  // Slots
  const titleType = "Title";
  const titleDefault = "Foo bar";
  const titleValue = text(titleType, titleDefault);

  const headingType = "Heading";
  const headingDefault = "Lorem ipsum dolor sit amet";
  const headingValue = text(headingType, headingDefault);

  const summaryType = "Summary";
  const summaryDefault =
    "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.";
  const summaryValue = text(summaryType, summaryDefault);

  const bodyType = "Body";
  const bodyDefault =
    "<p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>";
  const bodyValue = text(bodyType, bodyDefault);

  const footerType = "Footer";
  const footerDefault =
    "<rh-cta priority='primary'><a href='#'>Learn more</a></rh-cta>";
  const footerValue = text(footerType, footerDefault);

  const asideType = "Aside";
  const asideDefault =
    "<rh-card color='complement'><p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p><rh-cta priority='tertiary'><a href='#'>Learn more</a></rh-cta></rh-card>";
  const asideValue = text(asideType, asideDefault);

  return `
  <section>
    <h2>Your RH Element</h2>
    <rh-band${colorAttr}>
      ${titleValue || headingValue || summaryValue ? '<div slot="header">' : ""}
        ${titleValue ? '<h2 slot="title">' + titleValue + "</h2>" : ""}
        ${headingValue ? '<h3 slot="heading">' + headingValue + "</h3>" : ""}
        ${summaryValue ? '<p slot="summary">' + summaryValue + "</p>" : ""}
      ${titleValue || headingValue || summaryValue ? '</div">' : ""}
      ${bodyValue ? "<div>" + bodyValue + "</div>" : ""}
      ${footerValue ? '<div slot="footer">' + footerValue + "</div>" : ""}
      ${asideValue ? '<div slot="aside">' + asideValue + "</div>" : ""}
    </rh-band>
  </section>
  `;
});
