const rules = require("./rules");

module.exports = [
     rules.noLwcCustomProperties,
     rules.noSdsCustomProperties,
     rules.noSldsClassOverrides,
     rules.noBemUsage,
     rules.noImportant,
     rules.noSLDSPrivateVar,
     rules.noAuraTokens,
     rules.lwcToSLDS,
     rules.noHardcodedValues,
     rules.sldsClassCheck,
     rules.deprecatedSLDSClasses,
     rules.deprecatedSLDSTokens,
];