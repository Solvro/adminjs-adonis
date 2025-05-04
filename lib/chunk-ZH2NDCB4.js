import {
  databaseTypeToAdminType
} from "./chunk-LCXDWJPC.js";
import {
  __name
} from "./chunk-H736K5TN.js";

// src/adapter/property.ts
import { BaseProperty } from "adminjs";
var Property = class extends BaseProperty {
  static {
    __name(this, "Property");
  }
  columnOptions;
  defaultPath;
  defaultPosition;
  typeConverter;
  constructor(columnOptions, defaultPath, defaultPosition) {
    super({
      path: defaultPath,
      position: defaultPosition
    });
    this.columnOptions = columnOptions;
    this.defaultPath = defaultPath;
    this.defaultPosition = defaultPosition;
    this.typeConverter = databaseTypeToAdminType;
  }
  setTypeConverter(customTypeConverter) {
    this.typeConverter = customTypeConverter;
  }
  isId() {
    return this.columnOptions.lucidColumn.isPrimary;
  }
  isEditable() {
    return !this.isId() && this.columnOptions.lucidColumn.columnName !== "createdAt" && this.columnOptions.lucidColumn.columnName !== "updatedAt";
  }
  name() {
    return this.defaultPath;
  }
  isRequired() {
    return !this.columnOptions.databaseColumn.is_nullable;
  }
  isSortable() {
    return this.type() !== "reference";
  }
  reference() {
    const isRef = this.columnOptions.lucidRelation?.relationName;
    if (isRef) {
      return this.columnOptions.lucidRelation?.relatedModel()?.table ?? null;
    }
    return null;
  }
  availableValues() {
    return null;
  }
  position() {
    return this.defaultPosition;
  }
  type() {
    if (this.reference()) {
      return "reference";
    }
    const type = this.typeConverter(this.columnOptions.databaseColumn.data_type);
    if (!type) {
      console.warn(`Unhandled type: ${this.columnOptions.databaseColumn.data_type}`);
    }
    return type;
  }
};

export {
  Property
};
//# sourceMappingURL=chunk-ZH2NDCB4.js.map