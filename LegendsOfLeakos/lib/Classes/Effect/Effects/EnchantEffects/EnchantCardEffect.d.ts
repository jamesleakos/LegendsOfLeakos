import GiveEnchantmentBaseEffect from './GiveEnchantmentBaseEffect';
import EffectValue from '../../EffectValue';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
declare class EnchantCardEffect extends GiveEnchantmentBaseEffect {
    constructor(setEffectValues: Array<EffectValue>, setTargetTypes: Array<TargetType>);
    myRequiredEffectValues(): Array<EffectValueCreatorInfo>;
    numberOfTargetTypes(): number;
    targetTypeInfoList(): Array<TargetTypeInfo>;
    effectToString(gameManager: GameManager): string;
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
}
export default EnchantCardEffect;
