const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-hardcoded-values": true,
  },
};

test("no using hardcoded values", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal--form { color: red; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Avoid using hardcoded value "red" for "color". Use a variable, CSS Custom Property, or design token instead. (stylelint-plugin-slds/no-hardcoded-values)`);
});
test("fine using design token", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal_form { color: --lwc-paletteRed10; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(0);
  });
