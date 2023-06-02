import IntModifier from './IntModifier';
declare class ModifiableInt {
    baseValue: number;
    effectValueIntModifiers: IntModifier[];
    constructor(baseValue: number, effectValueIntModifiers: IntModifier[]);
    get effectiveValue(): number;
    toJSON(): any;
    static fromJSON(json: any): ModifiableInt;
}
export default ModifiableInt;
