import AttackBaseEffect from './AttackBaseEffect';
import { EffectType } from '../../../../Enums/Effect';

class NormalAttackEffect extends AttackBaseEffect {
  static MyRequiredEffectValues(): EffectValueCreatorInfo[] {
    const tempList: EffectValueCreatorInfo[] = [];
    for (let x of super.MyRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  static NumberOfTargetTypes(): number {
    return 1;
  }

  static TargetTypeInfoList(): TargetTypeInfo[] {
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

  static EffectToString(): string {
    const outText =
      "Unit attacks another unit. They both take damage equal to the other's attack.";
    return outText;
  }

  constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]) {
    super();
    this.effectEnum = EffectType.NormalAttack;
    this.SetEffectValueList(setEffectValues);
    this.SetTargetTypeList(setTargetTypes);
  }

  override PreEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    const sourceCard = sourceEntity as RuntimeCard;

    // Rerouting Blocked Attacks
    const attackedCard = this.GetAttackedCard(state, targetInfoList);
    const actualBlockingCards: RuntimeCard[] = [];
    const assignedBlockingCards: RuntimeCard[] = [];

    if (attackedCard.residingZone.zoneEnum === ZoneEnum.BackBoard) {
      for (let i = 0; i < state.effectSolver.blockedCards.length; i++) {
        if (state.effectSolver.blockedCards[i] === attackedCard.instanceId) {
          const blockingCard = state.GetCardFromAnywhere(
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

    const damageToAttackedCardEV = this.GetEffectValue(
      EffectValueType.DamageToAttackedCard
    );
    const damageToAttackingCardEV = this.GetEffectValue(
      EffectValueType.DamageToAttackingCard
    );
    const attackedCardDamagePreventedEV = this.GetEffectValue(
      EffectValueType.AttackedCardDamagePrevented
    );
    const attackingCardDamagePreventedEV = this.GetEffectValue(
      EffectValueType.AttackingCardDamagePrevented
    );

    damageToAttackedCardEV.setValue =
      sourceCard.namedStats['Attack'].effectiveValue;
    damageToAttackingCardEV.setValue =
      attackedCard.namedStats['Attack'].effectiveValue;

    const targetToBeAttacked = targetInfoList[0];
    damageToAttackedCardEV.FitToTargetInfo(targetToBeAttacked);
    attackedCardDamagePreventedEV.FitToTargetInfo(targetToBeAttacked);

    const attacker = new TargetInfo(
      [sourceCard.instanceId],
      [],
      false,
      false,
      false
    );
    damageToAttackingCardEV.FitToTargetInfo(attacker);
    attackingCardDamagePreventedEV.FitToTargetInfo(attacker);

    if (
      !(
        this.IsCardStillInPlay(attackedCard) &&
        this.IsCardStillInPlay(sourceCard)
      )
    )
      return false;
    return true;
  }

  Resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ) {
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    let sourceCard = sourceEntity as RuntimeCard;

    let attackedCard = this.GetAttackedCard(state, targetInfoList);
    let damageToAttackedCard = this.GetEffectValue(
      EffectValueType.DamageToAttackedCard
    ).modInts[0].effectiveValue;
    let damageToAttackingCard = this.GetEffectValue(
      EffectValueType.DamageToAttackingCard
    ).modInts[0].effectiveValue;

    // ... rest of your method ...
  }

  GetAttackedCard(state: GameState, targetInfoList: TargetInfo[]): RuntimeCard {
    return state.GetCardFromAnywhere(targetInfoList[0].cardInstanceIdList[0]);
  }

  ApplyShieldToAttackedCard(shieldAmount: number) {
    console.log(
      'Here we need to add a modifier to the DamageToAttackedCardEffectValue'
    );
  }

  HitDivineShield() {
    console.log('Here we need to implement this');
  }

  SendToBlockingEffect(
    state: GameState,
    sourceCard: RuntimeCard,
    attackedCard: RuntimeCard,
    blockingCards: RuntimeCard[]
  ) {
    blockingCards.sort((p, q) => p.serverBlockOrder - q.serverBlockOrder);
    console.log(
      'need to check here the order it was sorted in - ascending vs decending'
    );

    // ... rest of your method ...
  }
}
