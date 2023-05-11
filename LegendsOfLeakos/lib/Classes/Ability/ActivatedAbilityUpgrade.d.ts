import BaseAbilityUpgrade from './BaseAbilityUpgrade';
import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
import PayResourceCostUpgrade from '../PayResourceCost/PayResourceCostUpgrade';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import BaseAbility from './BaseAbility';
declare class ActivatedAbilityUpgrade extends BaseAbilityUpgrade {
    costUpgrades: PayResourceCostUpgrade[];
    usesPerTurnChange: ModifiableInt;
    isActive: boolean;
    constructor(abilityIndex: number, effectUpgrade: EffectUpgrade, addUsablePhases: PhaseEnum[], removeUsablePhases: PhaseEnum[], costUpgrades: PayResourceCostUpgrade[], usesPerTurnChange: ModifiableInt, isActive: boolean);
    upgradeAbility(ability: BaseAbility): void;
}
export default ActivatedAbilityUpgrade;
