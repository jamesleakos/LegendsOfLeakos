import BaseAbility from './BaseAbility';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
declare class BattlecryAbility extends BaseAbility {
    constructor(setName: string, setEffect: Effect, usableInPhases: PhaseEnum[]);
    static fromJSON(json: any): BattlecryAbility;
}
export default BattlecryAbility;
