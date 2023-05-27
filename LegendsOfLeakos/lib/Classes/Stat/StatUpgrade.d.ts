import Stat from './Stat';
import ModifiableInt from '../ModifableInt/ModifiableInt';
export declare class StatUpgrade {
    statId: number;
    value: ModifiableInt;
    constructor(statId: number, value: ModifiableInt);
    upgradeStat(stat: Stat): void;
    static fromJSON(json: any): StatUpgrade;
}
export default StatUpgrade;
