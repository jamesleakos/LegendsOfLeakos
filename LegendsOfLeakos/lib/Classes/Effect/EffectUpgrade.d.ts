import { EffectType } from '../../Enums/Effect';
import EffectValueUpgrade from '../Effect/EffectValueUpgrade';
import Effect from './Effect';
import TargetTypeUpgrade from '../Target/TargetTypeUpgrade';
declare class EffectUpgrade {
    effectEnum: EffectType;
    effectValueUpgrades: EffectValueUpgrade[];
    targetTypeUpgrades: TargetTypeUpgrade[];
    constructor(effectType: EffectType, effectValueUpgrades: EffectValueUpgrade[], targetTypeUpgrades: TargetTypeUpgrade[]);
    upgradeEffect(effect: Effect): void;
}
export default EffectUpgrade;
