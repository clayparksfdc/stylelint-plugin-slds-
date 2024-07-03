const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/slds-class-check": true,
  },
};

test("Using Correct SLDS Class", async () => {
  const result = await stylelint.lint({
    code: ".slds-button { color: red; }",
    config,
    configBasedir,
  });

  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(0);
});

test("no slds class overrides", async () => {
    const result = await stylelint.lint({
      code: ".slds-dave { color: red; }",
      config,
      configBasedir,
    });
  
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`The class "slds-dave" is not a standard SLDS class. (stylelint-plugin-slds/slds-class-check)`);
  });
  
