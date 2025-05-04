import { PropertyType } from 'adminjs';
export type TypeConverter = (columnType: string) => PropertyType;
export declare const databaseTypeToAdminType: TypeConverter;
