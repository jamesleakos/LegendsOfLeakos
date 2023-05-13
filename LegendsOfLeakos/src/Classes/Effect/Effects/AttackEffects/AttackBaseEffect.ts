import EntityEffect from '../../EntityEffect';
import GameState from '../../../Game/GameState';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import { EffectValueType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';

abstract class AttackBaseEffect extends EntityEffect {
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [
      new EffectValueCreatorInfo(EffectValueType.DamageToAttackingCard, false),
      new EffectValueCreatorInfo(EffectValueType.DamageToAttackedCard, false),
      new EffectValueCreatorInfo(
        EffectValueType.AttackedCardDamagePrevented,
        false
      ),
      new EffectValueCreatorInfo(
        EffectValueType.AttackingCardDamagePrevented,
        false
      ),
    ];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  // Resolves this effect on the specified card.
  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {}
}

export default AttackBaseEffect;
