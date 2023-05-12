import GameState from "./GameState";
import RuntimeCard from "../Card/RuntimeCard";
import Effect from "../Effect/Effect";
import TargetInfo from "../Target/TargetInfo";
import MoveCardEffect from "../Effect/Effects/MoveEffects/MoveCardEffect";
import UpgradeCardEffect from "../Effect/Effects/UpgradeEffects/UpgradeCardEffect";
import EffectValue from "../Effect/EffectValue";
import { EffectType, EffectValueType } from "../../Enums/Effect";
import { ZoneEnum, ZoneType } from "../../Enums/Zone";



class EffectSolver {
  gameState: GameState;
//   rng: Random;
  blockingCards: number[] = [];
  blockedCards: number[] = [];

  constructor(gameState: GameState, rngSeed: number) {
      this.gameState = gameState;
      this.gameState.effectSolver = this;
    //   this.rng = new Random(rngSeed);
  }

  // #region On Methods for Turns and Phases
  onRecruitmentPhaseStarted() {
      // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  onRecruitmentPhaseEnded() {
      // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  onManeuverPhaseStarted() {
      // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  onManeuverPhaseEnded() {
      // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  onSkirmishPhaseStarted() {
      // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  onSkirmishPhaseEnded() {
      // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  onBattlePhaseStarted() {
      // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  onBattlePhaseEnded() {
      this.resetBlockers();
      // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  // #endregion

  // Blocking
  protected resetBlockers() {
      for (let cardInstanceId of this.blockingCards) {
          let card = this.gameState.getCardFromAnywhere(cardInstanceId);
          card.amBlocking = false;
          card.serverBlockOrder = 0;
      }

      this.blockingCards = [];
      this.blockedCards = [];
  }

  // Fight Effects
  moveCard(playerNetId: number, card: RuntimeCard, originZone: ZoneEnum, destinationZone: ZoneEnum, targetInfo: TargetInfo[] | null = null) {
      let player = this.gameState.players.find(x => x.netId === playerNetId);
      if (player) {
          this.doEffect(card, this.createMoveEffect(originZone, destinationZone), targetInfo);

          let libraryCard = this.gameState.config.getCardFromLibraryId(card.libraryId);
          let cardType = this.gameState.config.cardTypes.find(x => x.id === libraryCard.cardTypeId);
          if (cardType.moveAfterTriggeringEffect) {
              let finalDestinationZone = this.gameState.config.gameZones.find(x => x.id === cardType.zoneId);
              this.doEffect(card, this.createMoveEffect(destinationZone, finalDestinationZone.zoneEnum), targetInfo);
          }
      }
  }

  createMoveEffect(originZoneEnum: ZoneEnum, destinationZoneEnum: ZoneEnum): Effect {
      let effect = new MoveCardEffect();
      effect.originZoneEnum = originZoneEnum;
      effect.destinationZoneEnum = destinationZoneEnum;

      return effect;
  }

  createFightEffect(): Effect {
      let targetTypes: TargetType[] = [];
      let effectValues: EffectValue[] = [];

      effectValues.push(new EffectValue(EffectValueType.DamageToAttackedCard, 0, []));
      effectValues.push(new EffectValue(EffectValueType.DamageToAttackingCard, 0, []
        effectValues.push(new EffectValue(EffectValueType.AttackedCardDamagePrevented, 0, []));
        effectValues.push(new EffectValue(EffectValueType.AttackingCardDamagePrevented, 0, []));

        return EffectFactory.createEffect(EffectType.NormalAttack, effectValues, targetTypes).getEffect();
  }

  createFightTargetInfoList(attackedCardInstanceId: number): TargetInfo[] {
      let attackedCardList = [attackedCardInstanceId];
      let attackedCardTargetInfo = new TargetInfo(attackedCardList, [], false, false, false);
      let tempTargetInfo = [attackedCardTargetInfo];

      return tempTargetInfo;
  }

  createUpgradeEffect(upgradeLevel: number): Effect {
      return new UpgradeCardEffect(upgradeLevel);
  }

  setDestroyConditions(card: RuntimeCard) {
      let cardType = card.cardType;
      for (let condition of cardType.destroyConditions) {
          if (condition instanceof StatDestroyCardCondition) {
              let statCondition = condition;
              card.stats[statCondition.statId].onValueChanged = (oldValue, newValue) => {
                  if (statCondition.isTrue(card)) {
                      this.moveCard(card.ownerPlayer.netId, card, card.residingZone.zoneEnum, ZoneEnum.Graveyard);
                  }
              };
          }
      }
  }

  areAllTargetsAvailable(effect: Effect, sourceCard: RuntimeCard, targets: TargetType[]): boolean {
      return effect.areTargetsAvailable(this.gameState, sourceCard, targets);
  }

  getRandomNumber(max: number): number {
      return this.rng.next(max);
  }

  getRandomNumberInRange(min: number, max: number): number {
      return this.rng.next(min, max);
  }

  doEffect(sourceCard: RuntimeCard, effect: Effect, targetInfoList: TargetInfo[]) {
      let success = effect.preEffect(this.gameState, sourceCard, targetInfoList);
      if (!success) return;
      for (let p of this.gameState.players) {
          for (let zone of p.zones) {
              let zoneDefinition = this.gameState.config.gameZones.find(x => x.id === zone.zoneId);
              if (zoneDefinition.type === ZoneType.Dynamic) {
                  zone.preResolveEffect(effect, sourceCard, this.gameState, targetInfoList);
              }
          }
      }

      effect.resolve(this.gameState, sourceCard, targetInfoList);

      for (let p of this.gameState.players) {
          for (let zone of p.zones) {
              let zoneDefinition = this.gameState.config.gameZones.find(x => x.id === zone.zoneId);
              if (zoneDefinition.type === ZoneType.Dynamic) {
                  zone.postResolveEffect(effect, sourceCard, this.gameState, targetInfoList);
              }
          }
      }

      this.updateStatBuffs();
  }

  updateStatBuffs() {
      // update stat buffs 
      // this bit just iterates through all stats - until marker
      for (let statPlayer of this.gameState.players) {
          for (let statZone of statPlayer.zones.filter(z => z.zoneEnum.isBoard())) { // this returns just the boards
              for (let statCard of statZone.cards) {
                  for (let statPair of statCard.stats) {
                      // marker - now we've got a stat
                      // from here, we're going to iterate through all keywords and see if they want to affect our stat
                      // first, we'll keep a record of the current effective value, because if it changes we want 
                      // to call an onValueChanged for the stat
                      
                      let stat = statPair.value
                      let oldEffectiveValue = stat.effectiveValue;

                      // have to clear them before we add
                      stat.buffs = [];
              
                      // now we do our big loop with everything
                      for (let player of this.gameState.players) {
                          for (let zone of player.zones.filter(z => z.zoneEnum.isBoard())) {
                              for (let enchantment of zone.enchantments) {
                                  for (let keyword of enchantment.runtimeKeywords) {
                                      let outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                      if (outBuff !== null) {
                                          stat.addBuff(outBuff.value, outBuff.details);
                                      }
                                  }
                              }
              
                              for (let card of zone.cards) {
                                  for (let keyword of card.runtimeKeywords) {
                                      let outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                      if (outBuff !== null) {
                                          stat.addBuff(outBuff.value, outBuff.details);
                                      }
                                  }
              
                                  for (let enchantment of card.enchantments) {
                                      for (let keyword of enchantment.runtimeKeywords) {
                                          let outBuff = keyword.addStatBuff(stat, statCard, this.gameState);
                                          if (outBuff !== null) {
                                              stat.addBuff(outBuff.value, outBuff.details);
                                          }
                                      }
                                  }
                              }
                          }
                      }
              
                      let outString = "";
                      for (let buff of stat.buffs) {
                          outString += buff.details;
                      }
              
                      // call the action - this should presumable update everything important as well
                      if (stat.effectiveValue !== oldEffectiveValue && stat.onValueChanged !== null) {
                          stat.onValueChanged(oldEffectiveValue, stat.effectiveValue);
                      }
                  }
              }
          }
      }
  }
}

export default EffectSolver;