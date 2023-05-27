import IntModifier from './IntModifier';
declare class ModifiableInt {
    baseValue: number;
    effectValueIntModifiers: IntModifier[];
    constructor(baseValue: number, effectValueIntModifiers: IntModifier[]);
    get effectiveValue(): number;
    static fromJSON(json: any): ModifiableInt;
}
export default ModifiableInt;
