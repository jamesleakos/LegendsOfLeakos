import Effect from './Effect';

abstract class EntityEffect extends Effect {
  public myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [];
    for (let x of super.MyRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  public isTargetInfoStillValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo,
    targetType: TargetType
  ): boolean {
    let validCount = 0;
    if (
      targetType.targetTypeEnum.BroadTargetType() === BroadTargetTypeEnum.card
    ) {
      // check if there are too many targets
      if (
        targetInfo.cardInstanceIdList.length > targetType.maxSelectionsAllowed
      )
        return false;

      for (let j of targetInfo.cardInstanceIdList) {
        let card = state.GetCardFromAnywhere(j);
        if (card === null) continue;

        // checking if the targetTypeEnum is correct
        switch (targetType.targetTypeEnum) {
          case TargetTypeEnum.TargetCreature:
            break;
          case TargetTypeEnum.TargetOpponentCreature:
            if (card.ownerPlayer === sourceEntity.ownerPlayer) continue;
            break;
          case TargetTypeEnum.TargetFriendlyCreature:
            if (card.ownerPlayer !== sourceEntity.ownerPlayer) continue;
            break;
          default:
            console.log('ERROR: missing conversion');
            continue;
        }

        // checking if the target satisfies the conditions
        for (let c of targetType.conditions) {
          if (!(c instanceof CardCondition)) continue;
          if (!(c as CardCondition).IsTrue(card)) continue;
        }

        // count to satisfy min and max
        validCount += 1;
      }
    } else if (
      targetType.targetTypeEnum.BroadTargetType() === BroadTargetTypeEnum.zone
    ) {
      // check if there are too many targets
      if (
        targetInfo.zoneInstanceIdList.length > targetType.maxSelectionsAllowed
      )
        return false;
      for (let zoneInstanceId of targetInfo.zoneInstanceIdList) {
        let zone = state.GetZone(zoneInstanceId);
        if (zone === null) continue;

        // checking if the targetTypeEnum is correct
        switch (targetType.targetTypeEnum) {
          case TargetTypeEnum.TargetRow:
            // I think this is always fine?
            break;
          case TargetTypeEnum.TargetOpponentRow:
            if (zone.ownerPlayer === sourceEntity.ownerPlayer) continue;
            break;
          case TargetTypeEnum.TargetFriendlyRow:
            if (zone.ownerPlayer !== sourceEntity.ownerPlayer) continue;
            break;
          case TargetTypeEnum.OpponentFrontRow:
            if (
              zone.ownerPlayer === sourceEntity.ownerPlayer ||
              zone.name !== 'FrontRow'
            )
              continue;
            break;
          case TargetTypeEnum.OpponentBackRow:
            if (
              zone.ownerPlayer === sourceEntity.ownerPlayer ||
              zone.name !== 'BackRow'
            )
              continue;
            break;
          case TargetTypeEnum.FriendlyFrontRow:
            if (
              zone.ownerPlayer !== sourceEntity.ownerPlayer ||
              zone.name !== 'FrontRow'
            )
              continue;
            break;
          case TargetTypeEnum.FriendlyBackRow:
            if (
              zone.ownerPlayer !== sourceEntity.ownerPlayer ||
              zone.name !== 'BackRow'
            )
              continue;
            break;
          default:
            throw new Error('missing conversion');
        }

        // checking if the target satisfies the conditions
        for (let c of targetType.conditions) {
          if (!(c instanceof ZoneCondition)) continue;
          if (!(c as ZoneCondition).IsTrue(zone)) continue;
        }

        // count to satisfy min and max
        validCount += 1;
      }
    }
    // check min conditions
    return validCount >= targetType.minSelectionsThatMustRemain;
  }

  public areAllSelectedTargetInfoItemsValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo[],
    targetTypes: TargetType[]
  ): boolean {
    if (targetTypes.length !== targetInfo.length) return false;

    for (let i = 0; i < targetInfo.length; i++) {
      if (targetInfo[i].noTargetWasSelected) continue;
      if (
        !this.isTargetInfoStillValid(
          sourceEntity,
          state,
          targetInfo[i],
          targetTypes[i]
        )
      )
        return false;
    }

    return true;
  }

  public isCardStillInPlay(entity: AbilityKeywordRuntimeEntity): boolean {
    if (
      entity.residingZone.name === 'BattleBoard' ||
      entity.residingZone.name === 'FrontBoard' ||
      entity.residingZone.name === 'BackBoard'
    )
      return true;
    return false;
  }

  public resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    // override this
  }

  public areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetTypes: TargetType[]
  ): boolean {
    let cards: RuntimeCard[] = [];
    let zones: RuntimeZone[] = [];
    for (let targetType of targetTypes) {
      if (targetType.minSelectionsRequired > 0) {
        switch (targetType.GetTargetType()) {
          case TargetTypeEnum.TargetCreature:
            for (let player of state.players) {
              for (let zone of player.zones) {
                for (let card of zone.cards) {
                  cards.push(card);
                }
              }
            }
            break;
          case TargetTypeEnum.TargetFriendlyCreature:
            for (let zone of state.players.find(
              (c) => c.id === sourceEntity.ownerPlayer.id
            ).zones) {
              for (let card of zone.cards) {
                cards.push(card);
              }
            }
            break;
          case TargetTypeEnum.TargetOpponentCreature:
            for (let zone of state.players.find(
              (c) => c.id !== sourceEntity.ownerPlayer.id
            ).zones) {
              for (let card of zone.cards) {
                cards.push(card);
              }
            }
            break;
          case TargetTypeEnum.TargetRow:
            for (let player of state.players) {
              for (let zone of player.zones) {
                zones.push(zone);
              }
            }
            break;
          case TargetTypeEnum.TargetFriendlyRow:
            for (let zone of state.players.find(
              (c) => c.netId === sourceEntity.ownerPlayer.netId
            ).zones) {
              zones.push(zone);
            }
            break;
          case TargetTypeEnum.TargetOpponentRow:
            for (let zone of state.players.find(
              (c) => c.netId !== sourceEntity.ownerPlayer.netId
            ).zones) {
              zones.push(zone);
            }
            break;
          default:
            throw new Error('Case Not Implemented');
        }

        let goodTargetExists = true;
        for (let card of cards) {
          let cardGood = true;
          for (let condition of targetType.conditions) {
            switch (condition.constructor) {
              case CardCondition:
                if (!(condition as CardCondition).IsTrue(card))
                  cardGood = false;
                break;
              default:
                throw new Error('Case not implemented here');
            }
          }
          if (!cardGood) goodTargetExists = false;
        }

        for (let zone of zones) {
          let zoneGood = true;
          for (let condition of targetType.conditions) {
            switch (condition.constructor) {
              case ZoneCondition:
                if (!(condition as ZoneCondition).IsTrue(zone))
                  zoneGood = false;
                break;
              default:
                throw new Error('Not implemented');
            }
          }

          if (!zoneGood) goodTargetExists = false;
        }
        if (!goodTargetExists) return false;
      }
    }
    return true;
  }
}

export default EntityEffect;
