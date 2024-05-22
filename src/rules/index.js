const rule1 = require("./rule1");
const rule2 = require("./rule2");
const noLwcCustomProperties = require("./no-lwc-custom-properties");
const noSdsCustomProperties = require("./no-sds-custom-properties");
const noSldsClassOverrides = require("./no-slds-class-overrides")

module.exports = {
  rule1,
  rule2,
  noLwcCustomProperties,
  noSdsCustomProperties,
  noSldsClassOverrides
};
