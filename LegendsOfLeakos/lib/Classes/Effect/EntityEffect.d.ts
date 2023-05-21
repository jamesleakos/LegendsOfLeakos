import Effect from './Effect';
import EffectValueCreatorInfo from './EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import TargetType from '../Target/TargetType';
declare abstract class EntityEffect extends Effect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    isTargetInfoStillValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetType: TargetType): boolean;
    areAllSelectedTargetInfoItemsValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo[], targetTypes: TargetType[]): boolean;
    isCardStillInPlay(entity: AbilityKeywordRuntimeEntity): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetTypes: TargetType[]): boolean;
}
export default EntityEffect;
