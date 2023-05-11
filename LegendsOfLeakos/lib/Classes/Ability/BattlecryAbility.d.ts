import BaseAbility from './BaseAbility';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
declare class BattlecryAbility extends BaseAbility {
    constructor(setName: string, setEffect: Effect, usableInPhases: PhaseEnum[]);
}
export default BattlecryAbility;
