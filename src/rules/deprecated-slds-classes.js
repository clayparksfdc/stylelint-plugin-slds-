const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');

const ruleName = 'stylelint-plugin-slds/deprecated-slds-classes';
const messages = stylelint.utils.ruleMessages(ruleName, {
  deprecated: className => `The class "${className}" is deprecated and not available in SLDS+. Please update to a supported class.`,
});

// Read the deprecated classes file
const tokenMappingPath = path.resolve("./src/metadata/deprecatedClasses.json");
const deprecatedClasses = new Set(JSON.parse(fs.readFileSync(tokenMappingPath, 'utf8')));

// Regex to match classes
const classRegex = /\.[\w-]+/g;

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkRules(rule => {
      const classMatches = rule.selector.match(classRegex);
      if (classMatches) {
        classMatches.forEach(match => {
          const className = match.slice(1); // Remove the leading dot
          if (deprecatedClasses.has(className)) {
            stylelint.utils.report({
              message: messages.deprecated(className),
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