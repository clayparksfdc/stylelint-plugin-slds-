const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/deprecated-slds-classes": true,
  },
};

test("no using deprecated class", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal__ { color: red; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`The class "slds-modal__" is deprecated and not available in SLDS+. Please update to a supported class. (stylelint-plugin-slds/deprecated-slds-classes)`);
});
test("fine using bem class (bem rule not enabled)", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { color: --lwc-paletteRed10; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(0);
  });
