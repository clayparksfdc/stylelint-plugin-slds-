const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

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
    let mockResult;
  
    beforeEach(() => {
      mockResult = {
        warnings: [],
      };
      stylelint.utils.report = jest.fn((warning) => {
        mockResult.warnings.push(warning);
      });
    });
  
    it('should not report warnings for valid HTML', async () => {
      await stylelint.lint({
        code: '<div class="valid-class"></div>',
        config,
        configBasedir,
      });
  
      expect(mockResult.warnings).toHaveLength(0);
    });
  
    it('should report warnings for deprecated classes in HTML', async () => {
      await stylelint.lint({
        code: '<div class="slds-modal--form"></div>',
        config: config,
        configBasedir: configBasedir,
      });
  
      expect(mockResult.warnings).toHaveLength(1);
      expect(mockResult.warnings[0].text).toContain('The class "slds-deprecated-class" is deprecated according to the BEM metadata.');
    });
  });
