const { JSDOM } = require('jsdom');
const stylelint = require('stylelint');

const ruleName = 'stylelint-plugin-slds/slds-plus-bem-deprecated';
const messages = {
  deprecated: 'The class "%s" is deprecated according to the BEM metadata.',
};

const checkHtml = (html, options) => {
  const metadataPath = options.metadataPath || 'src/metadata/sldsPlus.metadata.json';
  const metadata = require(metadataPath);
  const deprecatedClasses = metadata.bem.css.deprecated.selectors;

  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('*');

  const warnings = [];

  elements.forEach((element) => {
    const classNames = element.className.split(' ');
    classNames.forEach((className) => {
      if (deprecatedClasses.includes(className)) {
        warnings.push({
          message: messages.deprecated.replace('%s', className),
          severity: 'warning',
        });
      }
    });
  });

  return warnings;
};

module.exports = stylelint.createPlugin(ruleName, (enabled, options) => {
  return (root, result) => {
    if (!enabled) return;

    const filePath = options.from;
    if (!filePath || !filePath.endsWith('.html')) return;

    const html = require('fs').readFileSync(filePath, 'utf-8');
    const warnings = checkHtml(html, options);

    warnings.forEach((warning) => {
      stylelint.utils.report({
        ruleName,
        result,
        message: warning.message,
        node: root,
        severity: warning.severity,
      });
    });
  };
});