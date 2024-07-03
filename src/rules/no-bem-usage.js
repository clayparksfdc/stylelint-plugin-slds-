const stylelint = require("stylelint");
const fs = require('fs');
const path = require('path');

const ruleName = "stylelint-plugin-slds/no-bem-usage";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Selector: "${prop}". is no longer available ins SLDS+`,
});

// Function to load JSON from file
function loadJsonFromFile(filePath) {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    return JSON.parse(fileContent);
  }

  // Load the JSON object from file
const myObject = loadJsonFromFile('./src/metadata/sldsPlus.metadata.json');

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkRules((rule) => {
        console.log(rule)
      if (myObject.bem.css.deprecated.selectors.some(str => rule.selector.includes(str))) {
        stylelint.utils.report({
          message: messages.expected(rule.selector),
          line: rule.source.start.line,
          result,
          ruleName,
        });
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, rule);
