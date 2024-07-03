const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/lwc-to-slds-token": true,
  },
};

test("Error with Token usage and recommendation", async () => {
  const result = await stylelint.lint({
    code: ".slds-modal--form { font-family: --lwc-avatarGroupColorBackgroundInverse; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Replaced '--lwc-avatarGroupColorBackgroundInverse' with '--slds-g-color-on-surface-inverse-2' (stylelint-plugin-slds/lwc-to-slds-token)`);
});

test("Error with Token usage and no recommendation", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { font-family: --lwc-bannerGroupDefaultImage; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`This LWC token may not function in SLDS+. Consider updating to an SLDS token. (stylelint-plugin-slds/lwc-to-slds-token)`);
  });

  test("Error with Token usage and no recommendation", async () => {
    const result = await stylelint.lint({
      code: ".slds-modal--form { font-family: --lwc-dave; }",
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(`This LWC token may not function in SLDS+. Consider updating to an SLDS token. (stylelint-plugin-slds/lwc-to-slds-token)`);
  });