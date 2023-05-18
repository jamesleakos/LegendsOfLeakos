import AttackBaseEffect from './AttackBaseEffect';
import { EffectType } from '../../../../Enums/Effect';
import EffectValue from '../../EffectValue';
import TargetType from '../../../Target/TargetType';
import TargetInfo from '../../../Target/TargetInfo';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
} from '../../../../Enums/Target';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import { ZoneEnum } from '../../../../Enums/Zone';
import Effect from '../../Effect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import { EffectValueType } from '../../../../Enums/Effect';

class NormalAttackEffect extends AttackBaseEffect {
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    const tempList: EffectValueCreatorInfo[] = [];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes(): number {
    return 1;
  }

  override targetTypeInfoList(): TargetTypeInfo[] {
    const list: TargetTypeInfo[] = [];
    list.push(
      new TargetTypeInfo(
        'Target to be attacked', // name
        'Targets to be attacked.', // description
        'Targets must be cards',
        1, // minMinSelectionsRequired
        1 // maxMaxSelectionsRequired
      )
    );
    return list;
  }

  override effectToString(): string {
    const outText =
      "Unit attacks another unit. They both take damage equal to the other's attack.";
    return outText;
  }

  constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]) {
    super();
    this.effectEnum = EffectType.NormalAttack;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    const sourceCard = sourceEntity as RuntimeCard;

    // Rerouting Blocked Attacks
    const attackedCard = this.getAttackedCard(state, targetInfoList);
    const actualBlockingCards: RuntimeCard[] = [];
    const assignedBlockingCards: RuntimeCard[] = [];

    if (attackedCard.residingZone.zoneEnum === ZoneEnum.BackBoard) {
      for (let i = 0; i < state.effectSolver.blockedCards.length; i++) {
        if (state.effectSolver.blockedCards[i] === attackedCard.instanceId) {
          const blockingCard = state.getCardFromAnywhere(
            state.effectSolver.blockingCards[i]
          );
          assignedBlockingCards.push(blockingCard);
          if (blockingCard.residingZone.zoneEnum === ZoneEnum.FrontBoard) {
            actualBlockingCards.push(blockingCard);
          }
        }
      }
    }

    if (actualBlockingCards.length > 0) {
      this.SendToBlockingEffect(
        state,
        sourceCard,
        attackedCard,
        actualBlockingCards
      );
      return false;
    }

    const damageToAttackedCardEV = this.getEffectValue(
      EffectValueType.DamageToAttackedCard
    );
    const damageToAttackingCardEV = this.getEffectValue(
      EffectValueType.DamageToAttackingCard
    );
    const attackedCardDamagePreventedEV = this.getEffectValue(
      EffectValueType.AttackedCardDamagePrevented
    );
    const attackingCardDamagePreventedEV = this.getEffectValue(
      EffectValueType.AttackingCardDamagePrevented
    );

    damageToAttackedCardEV.setValue = sourceCard.attack.effectiveValue;
    damageToAttackingCardEV.setValue = attackedCard.attack.effectiveValue;

    const targetToBeAttacked = targetInfoList[0];
    damageToAttackedCardEV.fitToTargetInfo(targetToBeAttacked);
    attackedCardDamagePreventedEV.fitToTargetInfo(targetToBeAttacked);

    const attacker = new TargetInfo(
      [sourceCard.instanceId],
      [],
      false,
      false,
      false
    );
    damageToAttackingCardEV.fitToTargetInfo(attacker);
    attackingCardDamagePreventedEV.fitToTargetInfo(attacker);

    if (
      !(
        this.isCardStillInPlay(attackedCard) &&
        this.isCardStillInPlay(sourceCard)
      )
    )
      return false;
    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ) {
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    let sourceCard = sourceEntity as RuntimeCard;

    let attackedCard = this.getAttackedCard(state, targetInfoList);
    let damageToAttackedCard = this.getEffectValue(
      EffectValueType.DamageToAttackedCard
    ).modInts[0].effectiveValue;
    let damageToAttackingCard = this.getEffectValue(
      EffectValueType.DamageToAttackingCard
    ).modInts[0].effectiveValue;

    if (
      !(
        this.isCardStillInPlay(attackedCard) &&
        this.isCardStillInPlay(sourceCard)
      )
    )
      return;

    if (
      this.getEffectValue(
        EffectValueType.AttackedCardDamagePrevented
      ).effectiveValues()[0] === 0
    )
      attackedCard.health.baseValue -= damageToAttackedCard;
    if (
      this.getEffectValue(
        EffectValueType.AttackingCardDamagePrevented
      ).effectiveValues()[0] === 0
    )
      sourceCard.health.baseValue -= damageToAttackingCard;
  }

  getAttackedCard(state: GameState, targetInfoList: TargetInfo[]): RuntimeCard {
    return state.getCardFromAnywhere(targetInfoList[0].cardInstanceIdList[0]);
  }

  applyShieldToAttackedCard(shieldAmount: number) {
    console.log(
      'Here we need to add a modifier to the DamageToAttackedCardEffectValue'
    );
  }

  hitDivineShield() {
    console.log('Here we need to implement this');
  }

  public SendToBlockingEffect(
    state: GameState,
    sourceCard: RuntimeCard,
    attackedCard: RuntimeCard,
    blockingCards: RuntimeCard[]
  ): void {
    blockingCards.sort((p, q) => p.serverBlockOrder - q.serverBlockOrder);
    console.log(
      'need to check here the order it was sorted in - ascending vs decending'
    );

    const targetTypes: TargetType[] = [];

    targetTypes.push(
      new TargetType(
        'Attacked Card',
        TargetTypeEnum.TargetOpponentCreature,
        1,
        1,
        1,
        TargetableTypeSelectionEnum.TargetableOnActivation,
        []
      )
    );
    targetTypes.push(
      new TargetType(
        'Blocking Cards',
        TargetTypeEnum.TargetOpponentCreature,
        0,
        Number.MAX_SAFE_INTEGER,
        0,
        TargetableTypeSelectionEnum.AutoTarget,
        []
      )
    );

    const effectValues: EffectValue[] = [];

    effectValues.push(
      new EffectValue(EffectValueType.DamageToAttackedCard, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.DamageToAttackingCard, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.AttackedCardDamagePrevented, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.AttackingCardDamagePrevented, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.DamageToBlockingCards, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.BlockingCardInstanceIds, 0, [])
    );
    effectValues.push(
      new EffectValue(EffectValueType.DamageToBlockingCardsPrevented, 0, [])
    );

    const tempTargetInfo: TargetInfo[] =
      state.effectSolver.createFightTargetInfoList(attackedCard.instanceId);

    const blockedTargetInfoList: TargetInfo[] = [];

    const blockingCardList: number[] = [];
    const zoneList: number[] = [];
    for (const card of blockingCards) {
      blockingCardList.push(card.instanceId);
      zoneList.push(card.residingZone.instanceId);
    }

    const blockersTargetInfo = new TargetInfo(
      blockingCardList,
      zoneList,
      false,
      false,
      false
    );
    tempTargetInfo.push(blockersTargetInfo);

    state.effectSolver.doEffect(
      sourceCard,
      Effect.createEffect(EffectType.BlockedAttack, effectValues, targetTypes)
        .effect,
      blockedTargetInfoList
    );
  }
}

export default NormalAttackEffect;
