const noLwcCustomProperties = require("./no-lwc-custom-properties");
const noSdsCustomProperties = require("./no-sds-custom-properties");
const noSldsClassOverrides = require("./no-slds-class-overrides");
const noBemUsage = require("./no-bem-usage");
const noImportant = require("./no-important");
const noSLDSPrivateVar = require("./no-slds-private-var");
const noAuraTokens = require("./no-aura-tokens");
const lwcToSLDS = require("./lwc-to-slds-token");
const noHardcodedValues = require("./no-hardcoded-values");
const sldsClassCheck = require("./slds-class-check");
const deprecatedSLDSClasses = require("./deprecated-slds-classes");
const deprecatedSLDSTokens = require("./deprecated-slds-hooks")

module.exports = {
  noLwcCustomProperties,
  noSdsCustomProperties,
  noSldsClassOverrides,
  noBemUsage,
  noImportant,
  noSLDSPrivateVar,
  noAuraTokens,
  lwcToSLDS,
  noHardcodedValues,
  sldsClassCheck,
  deprecatedSLDSClasses,
  deprecatedSLDSTokens,
};
