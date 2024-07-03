const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/deprecated-slds-hooks": true,
  },
};

test("no using deprecated class", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal__ { color: --slds-c-accordion-heading-text-color; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Replaced deprecated hook "--slds-c-accordion-heading-text-color" with "--slds-c-accordion-heading-color" (stylelint-plugin-slds/deprecated-slds-hooks)`);
});
test("fine using bem class (bem rule not enabled)", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { color: --slds-c-accordion-color-border; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`The hook "--slds-c-accordion-color-border" is deprecated and will not work in SLDS+. Please remove or replace it. (stylelint-plugin-slds/deprecated-slds-hooks)`);
  });