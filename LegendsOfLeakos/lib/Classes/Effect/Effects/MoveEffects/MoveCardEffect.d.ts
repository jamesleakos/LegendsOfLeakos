import Effect from '../../Effect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import TargetInfo from '../../../Target/TargetInfo';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import { ZoneEnum } from '../../../../Enums/Zone';
declare class MoveCardEffect extends Effect {
    originZoneEnum: ZoneEnum;
    destinationZoneEnum: ZoneEnum;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(): string;
    cardTypeId: number;
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetTypes: TargetType[]): boolean;
    isTargetInfoStillValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetType: TargetType): boolean;
    areAllSelectedTargetInfoItemsValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[], targetTypes: TargetType[]): boolean;
}
export default MoveCardEffect;
