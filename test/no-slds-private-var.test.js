const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-slds-private-var": true,
  },
};

test("no sds custom properties declarations", async () => {
  const result = await stylelint.lint({
    code: ":root { --_slds-c-button-color-background: #0b5cab; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Unexpected "--_slds- private variable usage" within selector "--_slds-c-button-color-background". (stylelint-plugin-slds/no-slds-private-var)`);
});
