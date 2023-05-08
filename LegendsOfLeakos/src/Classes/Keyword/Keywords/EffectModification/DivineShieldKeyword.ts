import RuntimeKeyword from '../../RuntimeKeyword';
import KeywordValue from '../../KeywordValue';
import TargetableRuntimeEntity from '../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../Game/GameState';
import Effect from '../../../Effect/Effect';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetInfo from '../../../Target/TargetInfo';
import { KeywordType, KeywordValueType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';
import NormalAttackEffect from '../../../Effect/Effects/AttackEffects/NormalAttackEffect';

class DivineShieldKeyword extends RuntimeKeyword {
  constructor(
    myEntityId: number,
    keywordType: KeywordType,
    indexForUpgrades: number | null,
    setDescription: string,
    setIsPermanent: boolean,
    setDuration: number,
    keywordValueList: KeywordValue[],
    isActive: boolean,
    conditions: Condition[],
    imageName: string
  ) {
    super();
    this.setBaseData(
      myEntityId,
      keywordType,
      indexForUpgrades,
      setDescription,
      setIsPermanent,
      setDuration,
      keywordValueList,
      isActive,
      conditions,
      imageName
    );
  }

  useShield() {
    this.keywordValueList.find(
      (c) => c.keywordValueType === KeywordValueType.uses
    ).values[0] -= 1;

    if (
      this.keywordValueList.find(
        (c) => c.keywordValueType === KeywordValueType.uses
      ).values[0] <= 0
    ) {
      this.myEntity.condemnKeywordToRemoval(this);
    }
  }

  preResolveEffect(
    myEnt: TargetableRuntimeEntity,
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ) {
    if (!this.isActive) return;
    switch (e.constructor) {
      case NormalAttackEffect:
        const attackEffect = e as NormalAttackEffect;
        const target = attackEffect.getAttackedCard(gameState, targetInfoList);

        if (
          target.instanceId === this.myEntity.instanceId &&
          this.keywordValueList.find(
            (c) => c.keywordValueType === KeywordValueType.uses
          ).values[0] > 0
        ) {
          attackEffect.hitDivineShield();
          this.useShield();
        }
        return;
      default:
        return;
    }
  }
}

export default DivineShieldKeyword;
