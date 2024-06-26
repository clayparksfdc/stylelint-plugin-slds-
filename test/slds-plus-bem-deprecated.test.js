const stylelint = require("stylelint");
const { configBasedir } = require("./setup");
const path = require('path');

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/slds-plus-bem-deprecated": true,
  },
};

const validHtml = `
  <div class="valid-class"></div>
`;

const invalidHtml = `
  <div class="slds-modal--form"></div>
`;

describe('slds-plus-bem-deprecated rule', () => {

  it('should not report warnings for valid HTML', async () => {
    const result = await stylelint.lint({
      files: [path.join(__dirname, 'files/valid.html')],
      config,
      configBasedir,
    });
    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(0);
    expect(warnings[0].text).toBe("Dave");
  });

  it('should report warnings for deprecated classes in HTML', async () => {
    const result = await stylelint.lint({
      files: [path.join(__dirname, 'files/invalid.html')],
      config: config,
      configBasedir: configBasedir,
    });

    const warnings = result.results[0].warnings;
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe("Dave");
  });
});
