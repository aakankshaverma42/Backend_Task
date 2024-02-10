const { SchemaType } = require("mongoose");

class Mode extends SchemaType {
  constructor(key, options) {
    super(key, options, "Mode");
  }

  cast(val) {
    if (!["Assisted", "Self Learning"].includes(val)) {
      throw new Error("Invalid mode value");
    }
    return val;
  }
}

module.exports = Mode;
