import { LucidModel } from '@adonisjs/lucid/types/model';
import { SchemaInspector } from 'knex-schema-inspector/dist/types/schema-inspector.js';
import { LucidResourceMetadata } from '../types.js';
export default class LucidResource {
    model: LucidModel;
    connectionName: string;
    protected metadata: LucidResourceMetadata;
    constructor(model: LucidModel, connectionName: string);
    assignMetadata(inspector: SchemaInspector): Promise<void>;
    getMetadata(): LucidResourceMetadata;
}
