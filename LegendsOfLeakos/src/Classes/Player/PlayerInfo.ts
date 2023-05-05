class PlayerInfo {
  id: number;
  connectionId: number;
  //TODO: figure out how to replace this
  netId: NetworkInstanceId;
  nickname: string;
  isConnected: boolean;
  isHuman: boolean;

  stats: Map<number, Stat> = new Map<number, Stat>();
  namedStats: Map<string, Stat> = new Map<string, Stat>();
  zones: Array<RuntimeZone> = new Array<RuntimeZone>();
  realmSteward: RealmSteward = new RealmSteward();
  realm: RuntimeRealm = new RuntimeRealm();

  currentEntityInstanceId: number;
  readyForBattleQueue: boolean;

  getCardFromInstanceId(cardInstanceId: number): RuntimeCard | null {
    for (const zone of this.zones) {
      const tempCard = zone.cards.find((x) => x.instanceId === cardInstanceId);
      if (tempCard !== undefined) {
        return tempCard;
      }
    }
    return null;
  }

  getAllFriendlyCardsInPlay(): Array<RuntimeCard> {
    const cardList: Array<RuntimeCard> = new Array<RuntimeCard>();
    6;

    cardList.push(...this.getFriendlyZoneFromEnum(ZoneEnum.BackBoard).cards);
    cardList.push(...this.getFriendlyZoneFromEnum(ZoneEnum.FrontBoard).cards);
    cardList.push(...this.getFriendlyZoneFromEnum(ZoneEnum.BattleBoard).cards);

    return cardList;
  }

  getFriendlyZoneContainingCard(cardInstanceId: number): number {
    let board = 2;

    for (const zone of this.zones) {
      const tempCard = zone.cards.find((x) => x.instanceId === cardInstanceId);
      if (tempCard !== undefined) {
        board = zone.zoneId;
      }
    }

    return board;
  }

  getZoneFromInstanceId(zoneInstanceId: number): RuntimeZone | undefined {
    return this.zones.find((c) => c.instanceId === zoneInstanceId);
  }

  getFriendlyZoneFromEnum(zoneEnum: ZoneEnum): RuntimeZone | undefined {
    return this.zones.find((c) => c.zoneEnum === zoneEnum);
  }

  getFriendlyZoneFromZoneId(zoneZoneId: number): RuntimeZone | undefined {
    return this.zones.find((c) => c.zoneId === zoneZoneId);
  }

  setPlayerManaFromLand(): void {
    this.namedStats.get('ForestMana')!.baseValue = 0;
    this.namedStats.get('OceanMana')!.baseValue = 0;
    this.namedStats.get('DesertMana')!.baseValue = 0;
    this.namedStats.get('MountainMana')!.baseValue = 0;
    this.namedStats.get('PrairieMana')!.baseValue = 0;
    this.namedStats.get('FellsMana')!.baseValue = 0;
    this.namedStats.get('TundraMana')!.baseValue = 0;
    for (const landTile of this.realmSteward.landTiles) {
      if (landTile.explored) {
        switch (landTile.landType) {
          case LandType.forest:
            this.namedStats.get('ForestMana')!.baseValue += 1;
            break;
          case LandType.ocean:
            this.namedStats.get('OceanMana')!.baseValue += 1;
            break;
          case LandType.desert:
            this.namedStats.get('DesertMana')!.baseValue += 1;
            break;
          case LandType.mountain:
            this.namedStats.get('MountainMana')!.baseValue += 1;
            break;
          case LandType.prairie:
            this.namedStats.get('PrairieMana')!.baseValue += 1;
            break;
          case LandType.fells:
            this.namedStats.get('FellsMana')!.baseValue += 1;
            break;
          case LandType.tundra:
            this.namedStats.get('TundraMana')!.baseValue += 1;
            break;
        }
      }
    }
  }

  payResourceCosts(
    costs: Array<PayResourceCost>,
    goalManaSpend: Array<PayResourceCost> | null = null
  ): Array<PayResourceCost> | null {
    if (!this.canPayResourceCosts(costs)) {
      console.log('CANNOT PAY COSTS');
      return null;
    }

    const outList: Array<PayResourceCost> = new Array<PayResourceCost>();

    for (const cost of costs) {
      if (this.namedStats.get('AnyMana')!.statId !== cost.statId) {
        this._payResourceCost(
          this.stats.get(cost.statId)!,
          cost.value,
          outList
        );
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.namedStats.get('AnyMana')!.statId
    );
    if (anyCost !== undefined) {
      let anyValueRemaining = anyCost.value;
      if (goalManaSpend !== null) {
        for (const cost of goalManaSpend) {
          if (anyValueRemaining > 0) {
            this._payResourceCost(
              this.stats.get(cost.statId)!,
              Math.min(anyValueRemaining, cost.value),
              outList
            );
            anyValueRemaining -= cost.value;
          }
        }
      }

      for (const stat of this.stats.values()) {
        if (anyValueRemaining > 0) {
          if (this.namedStats.get('Life')!.statId !== stat.statId) {
            const reduceBy = Math.min(anyValueRemaining, stat.effectiveValue);
            this._payResourceCost(stat, reduceBy, outList);
            anyValueRemaining -= reduceBy;
          }
        }
      }
    }
    return outList;
  }

  private _payResourceCost(
    stat: Stat,
    cost: number,
    outlist: Array<PayResourceCost>
  ): void {
    // Pay the cost from this playerInfo's stats
    stat.baseValue -= cost;

    // Add the payment to the outlist

    // Check if this stat has already been used in outlist
    const tempCost = outlist.find((c) => c.statId === stat.statId);

    // If not, add it
    if (tempCost === undefined) {
      const newCost = new PayResourceCost(stat.statId, cost);
      outlist.push(newCost);
    }
    // If so, just increase the value
    else {
      tempCost.value += cost;
    }
  }

  canPayResourceCosts(costs: Array<PayResourceCost>): boolean {
    const availableResources: Array<PayResourceCost> = [];

    for (const playerResource of this.stats.values()) {
      const tempPRC = new PayResourceCost(
        playerResource.statId,
        playerResource.effectiveValue
      );
      availableResources.push(tempPRC);
    }

    for (const cost of costs) {
      if (this.namedStats['AnyMana'].statId !== cost.statId) {
        const availableResource = availableResources.find(
          (ar) => ar.statId === cost.statId
        );
        if (availableResource && availableResource.value < cost.value) {
          return false;
        }
        if (availableResource) {
          availableResource.value -= cost.value;
        }
      }
    }

    let remainingMana = 0;
    for (const c of availableResources) {
      if (c.statId !== this.namedStats['Life'].statId) {
        remainingMana += c.value;
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.namedStats['AnyMana'].statId
    );
    if (anyCost !== undefined) {
      if (anyCost.value > remainingMana) {
        return false;
      }
    }

    return true;
  }
}

export default PlayerInfo;
