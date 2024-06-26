const stylelint = require("stylelint");
const ruleName = "stylelint-plugin-slds/slds-plus-bem-deprecated";
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const PostcssSelectorParser = require('postcss-selector-parser');
const messages = {
  deprecated: 'The class "%s" is deprecated according to the BEM metadata.',
};

let dom;

function parse(html) {
  dom = new JSDOM(html);
}

function match(selectorAst) {
  if (dom === undefined) {
    throw new Error('Call parse() before match().');
  }
  const selector = selectorAst.toString();
  const matched = dom.window.document.querySelector(selector);
  return matched !== null;
}

module.exports = stylelint.createPlugin(ruleName, (enabled, options) => {
  console.log("2")
  return (postcssRoot, postcssResult) => {
    if (!enabled) return;

    const metadataPath = options.metadataPath || 'src/metadata/sldsPlus.metadata.json';
    const filePath = postcssResult.opts.from;

    if (!filePath || path.extname(filePath) !== '.html') {
      return;
    }

    if (!fs.existsSync(metadataPath)) {
      throw new Error(`Metadata file not found: ${metadataPath}`);
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`HTML file not found: ${filePath}`);
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const deprecatedClasses = metadata.bem.css.deprecated.selectors;
    console.log('Deprecated Classes:', deprecatedClasses)
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    parse(htmlContent);

    deprecatedClasses.forEach((className) => {
      const selectorAst = PostcssSelectorParser.parse(`.${className}`);

      selectorAst.walkClasses((classNode) => {
        if (classNode.value === className && match(selectorAst)) {
          stylelint.utils.report({
            ruleName,
            result: postcssResult,
            message: messages.deprecated.replace('%s', className),
            node: postcssRoot,
            severity: 'warning',
          });
        }
      });
    });
  };
});