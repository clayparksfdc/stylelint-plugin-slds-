const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-bem-usage": true,
  },
};

test("no slds bem usage", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal--form { color: red; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Selector: ".slds-modal--form". is no longer available ins SLDS+ (stylelint-plugin-slds/no-bem-usage)`);
});
test("no slds bem usage", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal_form { color: red; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(0);
  });
