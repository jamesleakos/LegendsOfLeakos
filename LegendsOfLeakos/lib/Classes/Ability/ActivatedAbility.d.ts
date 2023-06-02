import BaseAbility from './BaseAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import Effect from '../Effect/Effect';
import { PhaseEnum } from '../../Enums/Phase';
declare class ActivatedAbility extends BaseAbility {
    indexForUpgrades: number;
    isActive: boolean;
    costs: PayResourceCost[];
    usesPerTurn: number;
    usesRemaining: number;
    imageName: string;
    constructor(indexForUpgrades: number, setName: string, setEffect: Effect, setCosts: PayResourceCost[], setUsesPerTurn: number, setUsesRemaining: number, usableInPhases: PhaseEnum[], isActive: boolean, imageName: string);
    onEndTurn(): void;
    static createActivatedAbility(indexForUpgrades: number, abilityName: string, effect: Effect, costs: PayResourceCost[], usesPerTurn: number, usesRemaining: number, usableInPhases: PhaseEnum[], isActive: boolean, imageName: string): ActivatedAbility;
    toJSON(): any;
    static fromJSON(json: any): ActivatedAbility;
}
export default ActivatedAbility;
