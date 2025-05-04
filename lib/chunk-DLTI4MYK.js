import {
  Property
} from "./chunk-ZH2NDCB4.js";
import {
  __name
} from "./chunk-H736K5TN.js";

// src/adapter/resource.ts
import { BaseRecord, BaseResource, flat } from "adminjs";
var Resource = class Resource2 extends BaseResource {
  static {
    __name(this, "Resource");
  }
  lucidResource;
  propertiesMap;
  model;
  constructor(lucidResource) {
    super(lucidResource);
    this.lucidResource = lucidResource;
    this.propertiesMap = /* @__PURE__ */ new Map();
    this.model = lucidResource.model;
    const metadata = this.lucidResource.getMetadata();
    const columns = [
      ...metadata.columns.entries()
    ];
    columns.forEach(([name, columnOptions], idx) => {
      if (columnOptions) {
        const property = new Property(columnOptions, name, idx);
        this.propertiesMap.set(name, property);
      }
    });
  }
  static isAdapterFor(lucidResource) {
    return typeof lucidResource?.getMetadata === "function" && !!lucidResource.getMetadata().columns && !!lucidResource.getMetadata().relations;
  }
  id() {
    return this.model.table;
  }
  name() {
    return this.model.name;
  }
  databaseType() {
    return this.model.query().client.dialect.name;
  }
  databaseName() {
    return "lucid";
  }
  properties() {
    return [
      ...this.propertiesMap.values()
    ];
  }
  property(path) {
    return this.propertiesMap.get(path) ?? null;
  }
  async findOne(id) {
    const query = this.model.query().where(this.model.primaryKey, id);
    const rawRecord = await query.first();
    if (!rawRecord) {
      return null;
    }
    return new BaseRecord(rawRecord.toJSON(), this);
  }
  async find(filter, options) {
    const query = this.applyFilters(this.model.query(), filter);
    if (options.limit !== void 0) {
      query.limit(options.limit);
    }
    if (options.offset !== void 0) {
      query.offset(options.offset);
    }
    if (options.sort?.sortBy !== void 0 && options.sort?.direction !== void 0) {
      query.orderBy(options.sort.sortBy, options.sort.direction);
    }
    const rawRecords = await query;
    return rawRecords.map((r) => new BaseRecord(r.toJSON(), this));
  }
  async findMany(ids) {
    const query = this.model.query().whereIn(this.model.primaryKey, ids);
    const rawRecords = await query;
    return rawRecords.map((r) => new BaseRecord(r.toJSON(), this));
  }
  async count(filter) {
    const query = this.applyFilters(this.model.query(), filter);
    const result = await query.count("*", "count").first();
    if (!result) {
      return 0;
    }
    return +result.$extras.count;
  }
  async create(params) {
    const unflattenedParams = flat.unflatten(params);
    const object = new this.model().fill(unflattenedParams);
    await object.save();
    return object.toJSON();
  }
  async delete(id) {
    const object = await this.model.find(id);
    if (object) {
      await object.delete();
    }
  }
  async update(id, params = {}) {
    const unflattenedParams = flat.unflatten(params);
    const object = await this.model.find(id);
    if (!object)
      return {};
    object.merge(unflattenedParams);
    await object.save();
    return object.toJSON();
  }
  applyFilters(query, filter) {
    Object.keys(filter.filters).forEach((key) => {
      const filterElement = filter.filters[key];
      const property = filterElement.property;
      if (property.type() === "uuid" || property.isId() || property.type() === "boolean") {
        query.where(key, filterElement.value);
      } else if (property.type() === "string" || property.type() === "textarea") {
        const dialect = this.databaseType();
        if (dialect === "postgres") {
          query.whereILike(key, `%${filterElement.value}%`);
        } else {
          query.whereLike(key, `%${filterElement.value}%`);
        }
      } else if (property.type() === "date" || property.type() === "datetime") {
        if (filterElement.value.from) {
          query.where(key, ">=", filterElement.value.from);
        }
        if (filterElement.value.to) {
          query.where(key, "<=", filterElement.value.to);
        }
      } else {
        query.where(key, filterElement.value);
      }
    });
    return query;
  }
};
var resource_default = Resource;

export {
  resource_default
};
//# sourceMappingURL=chunk-DLTI4MYK.js.map