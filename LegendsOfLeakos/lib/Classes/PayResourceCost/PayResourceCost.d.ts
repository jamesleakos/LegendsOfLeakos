declare class PayResourceCost {
    statId: number;
    value: number;
    constructor(statId: number, value: number);
    getReadableString(statDefinitions: any): string | null;
    toJSON(): any;
    static fromJSON(json: any): PayResourceCost;
}
export default PayResourceCost;
