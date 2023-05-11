import IntModifier from './IntModifier';
declare class ModifiableInt {
    baseValue: number;
    intModifiers: Array<IntModifier>;
    constructor(baseValue: number, effectValueIntModifiers: Array<IntModifier>);
    get effectiveValue(): number;
}
export default ModifiableInt;
