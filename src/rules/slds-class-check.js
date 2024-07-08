const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');

const ruleName = 'stylelint-plugin-slds/slds-class-check';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: className => `The class "${className}" is not a standard SLDS class.`,
});

// Read the token mapping file
const tokenMappingPath = path.resolve(__dirname, "../metadata/slds_classes.json");
const sldsClasses = new Set(JSON.parse(fs.readFileSync(tokenMappingPath, 'utf8')));

// Regex to match SLDS classes
const sldsClassRegex = /\.slds-[\w-]+/g;

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkRules(rule => {
      const sldsMatches = rule.selector.match(sldsClassRegex);
      if (sldsMatches) {
        sldsMatches.forEach(match => {
          const className = match.slice(1); // Remove the leading dot
          if (!sldsClasses.has(className)) {
            stylelint.utils.report({
              message: messages.rejected(className),
              node: rule,
              result,
              ruleName,
            });
          }
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;