const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');
const fs = require('fs');
const path = require('path');

const ruleName = 'stylelint-plugin-slds/lwc-to-slds-token';
const messages = stylelint.utils.ruleMessages(ruleName, {
  replaced: (oldValue, newValue) => `Replaced '${oldValue}' with '${newValue}'`,
  warning: 'This LWC token may not function in SLDS+. Consider updating to an SLDS token.',
});

// Read the LWC to SLDS mapping file
const tokenMappingPath = path.resolve("./src/metadata/lwcToSlds.json");
const lwcToSLDS = JSON.parse(fs.readFileSync(tokenMappingPath, 'utf8'));

module.exports = stylelint.createPlugin(ruleName, function(primary) {
  return function(root, result) {
    root.walkDecls(decl => {
      const parsedValue = valueParser(decl.value);
      let valueChanged = false;
      
      parsedValue.walk(node => {
        if (node.type === 'word' && node.value.startsWith('--lwc-')) {
          if (node.value in lwcToSLDS && lwcToSLDS[node.value].startsWith('--slds-')) {
            const newValue = lwcToSLDS[node.value];
            const oldValue = node.value;
            node.value = newValue;
            valueChanged = true;
            stylelint.utils.report({
              message: messages.replaced(oldValue, newValue),
              node: decl,
              result,
              ruleName,
              fix: fix => {
                fix.updateValue(parsedValue.toString());
              },
            });
          } else {
            stylelint.utils.report({
              message: messages.warning,
              node: decl,
              result,
              ruleName,
            });
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