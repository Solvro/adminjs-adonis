import { BaseRecord, BaseResource, Filter } from 'adminjs';
import { LucidModel, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model';
import LucidResource from './lucid_resource.js';
import Property from './property.js';
declare class Resource extends BaseResource {
    protected lucidResource: LucidResource;
    protected propertiesMap: Map<string, Property>;
    protected model: LucidModel;
    constructor(lucidResource: LucidResource);
    static isAdapterFor(lucidResource: any): boolean;
    id(): string;
    name(): string;
    databaseType(): "mssql" | "mysql" | "oracledb" | "postgres" | "redshift" | "sqlite3" | "better-sqlite3";
    databaseName(): string;
    properties(): Property[];
    property(path: string): Property | null;
    findOne(id: string): Promise<BaseRecord | null>;
    find(filter: Filter, options: {
        limit?: number | undefined;
        offset?: number | undefined;
        sort?: {
            sortBy?: string | undefined;
            direction?: 'asc' | 'desc' | undefined;
        } | undefined;
    }): Promise<BaseRecord[]>;
    findMany(ids: string[]): Promise<BaseRecord[]>;
    count(filter: Filter): Promise<number>;
    create(params: Record<string, any>): Promise<import("@adonisjs/lucid/types/model").ModelObject>;
    delete(id: string): Promise<void>;
    update(id: string, params?: Record<string, any>): Promise<import("@adonisjs/lucid/types/model").ModelObject>;
    protected applyFilters(query: ModelQueryBuilderContract<LucidModel>, filter: Filter): ModelQueryBuilderContract<LucidModel, import("@adonisjs/lucid/types/model").LucidRow>;
}
export default Resource;
