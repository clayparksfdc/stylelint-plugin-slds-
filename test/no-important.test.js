const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-important": true,
  },
};

test("Error with Important", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal--form { color: !important; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Avoid using !important (stylelint-plugin-slds/no-important)`);
});
test("No error with no important", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal_form { color: red; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(0);
  });
