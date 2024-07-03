const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');
const fs = require('fs');
const path = require('path');

const ruleName = 'stylelint-plugin-slds/deprecated-slds-hooks';
const messages = stylelint.utils.ruleMessages(ruleName, {
  replaced: (oldToken, newToken) => `Replaced deprecated hook "${oldToken}" with "${newToken}"`,
  deprecated: token => `The hook "${token}" is deprecated and will not work in SLDS+. Please remove or replace it.`,
});

// Read the deprecated tokens file
const tokenMappingPath = path.resolve("./src/metadata/deprecatedHooks.json");
const deprecatedTokens = JSON.parse(fs.readFileSync(tokenMappingPath, 'utf8'));

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkDecls(decl => {
      const parsedValue = valueParser(decl.value);
      let valueChanged = false;

      parsedValue.walk(node => {
        if (node.type === 'word' && node.value.startsWith('--slds-')) {
          if (node.value in deprecatedTokens) {
            if (deprecatedTokens[node.value] === null) {
              stylelint.utils.report({
                message: messages.deprecated(node.value),
                node: decl,
                result,
                ruleName,
              });
            } else {
              const oldValue = node.value;
              node.value = deprecatedTokens[node.value];
              valueChanged = true;
              stylelint.utils.report({
                message: messages.replaced(oldValue, node.value),
                node: decl,
                result,
                ruleName,
                fix: fix => {
                  fix.updateValue(parsedValue.toString());
                },
              });
            }
          }
        }
      });

      if (valueChanged) {
        decl.value = parsedValue.toString();
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;