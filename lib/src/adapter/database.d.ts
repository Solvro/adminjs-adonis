import { BaseDatabase } from 'adminjs';
export default class Database extends BaseDatabase {
    constructor(db: any);
    static isAdapterFor(_database: any): boolean;
    resources(): never[];
}
