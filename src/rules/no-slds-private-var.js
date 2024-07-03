const stylelint = require("stylelint");

const ruleName = "stylelint-plugin-slds/no-slds-private-var";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Unexpected "--_slds- private variable usage" within selector "${prop}".`,
});

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkDecls((decl) => {
      if (decl.prop.startsWith("--_slds-")) {
        stylelint.utils.report({
          message: messages.expected(decl.prop),
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, rule);
