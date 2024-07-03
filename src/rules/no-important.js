const stylelint = require('stylelint');

const ruleName = 'stylelint-plugin-slds/no-important';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: 'Avoid using !important',
});

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkDecls(decl => {
      if (decl.important) {
        stylelint.utils.report({
          message: messages.rejected,
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;