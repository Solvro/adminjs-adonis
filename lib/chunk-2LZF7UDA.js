import {
  __name
} from "./chunk-H736K5TN.js";

// src/adapter/database.ts
import { BaseDatabase } from "adminjs";
var Database = class extends BaseDatabase {
  static {
    __name(this, "Database");
  }
  constructor(db) {
    super(db);
  }
  static isAdapterFor(_database) {
    return true;
  }
  resources() {
    return [];
  }
};

export {
  Database
};
//# sourceMappingURL=chunk-2LZF7UDA.js.map