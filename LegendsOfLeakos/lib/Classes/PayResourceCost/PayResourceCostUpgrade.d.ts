import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class PayResourceCostUpgrade {
    statId: number;
    valueChange: ModifiableInt;
    constructor(statId: number, valueChange: ModifiableInt);
    static fromJSON(json: any): PayResourceCostUpgrade;
}
export default PayResourceCostUpgrade;
