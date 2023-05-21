import GiveEnchantmentBaseEffect from './GiveEnchantmentBaseEffect';
import EffectValue from '../../EffectValue';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
declare class EnchantZoneEffect extends GiveEnchantmentBaseEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(gameManager: GameManager): string;
    constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
}
export default EnchantZoneEffect;
