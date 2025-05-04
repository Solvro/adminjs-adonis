import {
  __name
} from "./chunk-H736K5TN.js";

// src/adapter/lucid_resource.ts
var LucidResource = class {
  static {
    __name(this, "LucidResource");
  }
  model;
  connectionName;
  metadata;
  constructor(model, connectionName) {
    this.model = model;
    this.connectionName = connectionName;
    this.metadata = {
      columns: /* @__PURE__ */ new Map(),
      relations: /* @__PURE__ */ new Map()
    };
  }
  async assignMetadata(inspector) {
    const columns = await inspector.columnInfo(this.model.table);
    const columnsMap = /* @__PURE__ */ new Map();
    columns.forEach((column) => {
      const lucidColumnDefinitions = [
        ...this.model.$columnsDefinitions.entries()
      ];
      const lucidColumn = lucidColumnDefinitions.find(([_key, info]) => info.columnName === column.name);
      const lucidRelation = [
        ...this.model.$relationsDefinitions.values()
      ].find((relation) => relation.options?.foreignKey === column.name);
      if (lucidColumn) {
        columnsMap.set(lucidColumn[0], {
          lucidColumn: lucidColumn[1],
          lucidRelation,
          databaseColumn: column
        });
      }
    });
    this.metadata = {
      columns: columnsMap,
      relations: this.model.$relationsDefinitions
    };
  }
  getMetadata() {
    return this.metadata;
  }
};

export {
  LucidResource
};
//# sourceMappingURL=chunk-7OLKFT6G.js.map