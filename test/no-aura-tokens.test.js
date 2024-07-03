const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-aura-tokens": true,
  },
};

test("Error with Token usage and recommendation", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal--form { font-family: token(paletteIndigo10); }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Replaced 'token(paletteIndigo10)' with '--lwc-paletteIndigo10' (stylelint-plugin-slds/no-aura-tokens)`);
});

test("Error with Token t usage and recommendation", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { font-family: t(paletteIndigo10); }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`Replaced 't(paletteIndigo10)' with '--lwc-paletteIndigo10' (stylelint-plugin-slds/no-aura-tokens)`);
  });

test("Error with Token usage and no recommendation", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { font-family: token(dave); }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`Aura tokens are deprecated. Please migrate to SLDS Design Tokens. (stylelint-plugin-slds/no-aura-tokens)`);
  });
