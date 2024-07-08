const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');
const fs = require('fs');
const path = require('path');

const ruleName = 'stylelint-plugin-slds/no-aura-tokens';
const messages = stylelint.utils.ruleMessages(ruleName, {
  deprecated: 'Aura tokens are deprecated. Please migrate to SLDS Design Tokens.',
  replaced: (oldValue, newValue) => `Replaced '${oldValue}' with '${newValue}'`,
});

// Read the token mapping file
const tokenMappingPath = path.resolve(__dirname, "../metadata/tokenMapping.json");
const tokenMapping = JSON.parse(fs.readFileSync(tokenMappingPath, 'utf8'));

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkDecls(decl => {
      const parsedValue = valueParser(decl.value);
      
      parsedValue.walk(node => {
        if (node.type === 'function' && (node.value === 'token' || node.value === 't')) {
          const tokenName = node.nodes[0].value;
          
          if (tokenName in tokenMapping) {
            const newValue = tokenMapping[tokenName];
            if (typeof newValue === 'string' && newValue.startsWith('--lwc-')) {
              stylelint.utils.report({
                message: messages.replaced(decl.value, newValue),
                node: decl,
                result,
                ruleName,
                fix: fix => {
                  fix.updateValue(newValue);
                },
              });
            } else {
              stylelint.utils.report({
                message: messages.deprecated,
                node: decl,
                result,
                ruleName,
              });
            }
          } else {
            stylelint.utils.report({
              message: messages.deprecated,
              node: decl,
              result,
              ruleName,
            });
          }
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;