declare class StatModifier {
    private static readonly PERMANENT;
    value: number;
    duration: number;
    constructor(value: number, duration?: number);
    isPermanent(): boolean;
}
export default StatModifier;
