const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const ruleName = 'stylelint-plugin-slds/no-hardcoded-values';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (prop, value) => 
    `Avoid using hardcoded value "${value}" for "${prop}". Use a variable, CSS Custom Property, or design token instead.`,
});

const properties = [
    'color',
    'background-color',
    'border-color',
    'font-size',
    'margin',
    'padding',
    'width',
    'height',
  ];
  
  const colorNames = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white',
    'gray', 'pink', 'brown', 'cyan', 'magenta', 'lime', 'olive', 'navy',
    'teal', 'aqua', 'silver', 'gold', 'indigo', 'violet', 'beige', 'ivory',
    'turquoise', 'coral', 'maroon', 'plum', 'khaki', 'orchid', 'salmon'
  ];
  
  function isHardcodedValue(value) {
    return /^#[0-9A-Fa-f]{3,8}$/.test(value) || // Hex color
           /^rgb/.test(value) || // RGB/RGBA color
           /^hsl/.test(value) || // HSL/HSLA color
           /^[0-9]+(%|px|em|rem|vh|vw)$/.test(value) || // Number with unit
           colorNames.includes(value.toLowerCase()); // Color name
  }
  
  module.exports = stylelint.createPlugin(ruleName, function(primary) {
    return function(root, result) {
      root.walkDecls(decl => {
        if (properties.includes(decl.prop)) {
          const parsedValue = valueParser(decl.value);
          
          parsedValue.walk(node => {
            if (node.type === 'word' && isHardcodedValue(node.value)) {
              stylelint.utils.report({
                message: messages.rejected(decl.prop, node.value),
                node: decl,
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