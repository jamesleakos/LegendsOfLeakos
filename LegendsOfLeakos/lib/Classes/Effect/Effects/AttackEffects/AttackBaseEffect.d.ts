import EntityEffect from '../../EntityEffect';
import GameState from '../../../Game/GameState';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
declare abstract class AttackBaseEffect extends EntityEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
}
export default AttackBaseEffect;
