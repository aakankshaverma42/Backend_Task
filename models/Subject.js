const { SchemaType } = require("mongoose");

class Subject extends SchemaType {
  constructor(key, options) {
    super(key, options, "Subject");
  }

  cast(val) {
    if (typeof val !== "string") {
      throw new Error("Subject must be a string");
    }

    return val;
  }
}

module.exports = Subject;
