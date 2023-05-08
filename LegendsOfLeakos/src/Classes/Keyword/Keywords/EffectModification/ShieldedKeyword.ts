import RuntimeKeyword from '../../RuntimeKeyword';
import KeywordValue from '../../KeywordValue';
import TargetableRuntimeEntity from '../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../Game/GameState';
import Effect from '../../../Effect/Effect';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetInfo from '../../../Target/TargetInfo';
import { KeywordType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';
import NormalAttackEffect from '../../../Effect/Effects/AttackEffects/NormalAttackEffect';

class ShieldedKeyword extends RuntimeKeyword {
  constructor(
    setMyEntityId: number,
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
      setMyEntityId,
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

  public preResolveEffect(
    myEnt: TargetableRuntimeEntity,
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    if (!this.isActive) return;
    switch (e.constructor) {
      case NormalAttackEffect:
        const attackEffect = e as NormalAttackEffect;
        const target = attackEffect.getAttackedCard(gameState, targetInfoList);
        const shieldingCard = gameState.getCardFromAnywhere(
          this.getKeywordValue(KeywordValueType.shieldingCardInstanceId)
        );

        if (
          target.instanceId === this.myEntityInstanceId &&
          (shieldingCard.residingZone.name === 'FrontBoard' ||
            shieldingCard.residingZone.name === 'BackBoard')
        ) {
          attackEffect.applyShieldToAttackedCard(
            this.getKeywordValue(KeywordValueType.shieldAmount)
          );
        }
        return;
      default:
        return;
    }
  }

  public postResolveEffect(
    myEnt: TargetableRuntimeEntity,
    e: Effect,
    sourceCard: RuntimeCard,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    if (!this.isActive) return;
    switch (e.constructor) {
      case MoveCardEffect:
        const moveEffect = e as MoveCardEffect;
        if (
          sourceCard.instanceId ===
          this.getKeywordValue(KeywordValueType.shieldingCardInstanceId)
        ) {
          const shieldingCard = gameState.getCardFromAnywhere(
            this.getKeywordValue(KeywordValueType.shieldingCardInstanceId)
          );
          if (
            shieldingCard.residingZone.name === 'Frontboard' ||
            shieldingCard.residingZone.name === 'BackBoard' ||
            shieldingCard.residingZone.name === 'BattleBoard'
          ) {
            this.myEntity.removeKeyword(this);
          }
        }
        return;
      default:
        return;
    }
  }
}

export default ShieldedKeyword;
