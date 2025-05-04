import { BaseProperty, PropertyType } from 'adminjs';
import { LucidColumnMetadata } from '../types.js';
import { TypeConverter } from './type_converter.js';
export default class Property extends BaseProperty {
    protected columnOptions: LucidColumnMetadata;
    protected defaultPath: string;
    protected defaultPosition: number;
    protected typeConverter: TypeConverter;
    constructor(columnOptions: LucidColumnMetadata, defaultPath: string, defaultPosition: number);
    setTypeConverter(customTypeConverter: (dataType: string) => PropertyType): void;
    isId(): boolean;
    isEditable(): boolean;
    name(): string;
    isRequired(): boolean;
    isSortable(): boolean;
    reference(): string | null;
    availableValues(): Array<string> | null;
    position(): number;
    type(): PropertyType;
}
