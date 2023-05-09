import Stat from '../Stat/Stat';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import { ZoneEnum } from '../../Enums/Zone';
import { LandType } from '../../Enums/LandAndBiome';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeLandTile from '../RealmsAndLand/LandTile/RuntimeLandTile';
import RuntimeRealm from '../RealmsAndLand/Realm/RuntimeRealm';

class PlayerInfo {
  id: number;
  connectionId: number;
  netId: number;
  nickname: string;
  isConnected: boolean;
  isHuman: boolean;

  stats: Stat[] = [];
  nameToStat: Map<string, Stat>;
  idToStat: Map<number, Stat>;
  zones: RuntimeZone[];
  landTiles: RuntimeLandTile[];
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
    this.nameToStat.get('ForestMana')!.baseValue = 0;
    this.nameToStat.get('OceanMana')!.baseValue = 0;
    this.nameToStat.get('DesertMana')!.baseValue = 0;
    this.nameToStat.get('MountainMana')!.baseValue = 0;
    this.nameToStat.get('PrairieMana')!.baseValue = 0;
    this.nameToStat.get('FellsMana')!.baseValue = 0;
    this.nameToStat.get('TundraMana')!.baseValue = 0;
    for (const landTile of this.landTiles) {
      if (landTile.explored) {
        switch (landTile.landType) {
          case LandType.forest:
            this.nameToStat.get('ForestMana')!.baseValue += 1;
            break;
          case LandType.ocean:
            this.nameToStat.get('OceanMana')!.baseValue += 1;
            break;
          case LandType.desert:
            this.nameToStat.get('DesertMana')!.baseValue += 1;
            break;
          case LandType.mountain:
            this.nameToStat.get('MountainMana')!.baseValue += 1;
            break;
          case LandType.prairie:
            this.nameToStat.get('PrairieMana')!.baseValue += 1;
            break;
          case LandType.fells:
            this.nameToStat.get('FellsMana')!.baseValue += 1;
            break;
          case LandType.tundra:
            this.nameToStat.get('TundraMana')!.baseValue += 1;
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
      if (this.nameToStat.get('AnyMana')!.statId !== cost.statId) {
        this._payResourceCost(
          this.idToStat.get(cost.statId)!,
          cost.value,
          outList
        );
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.nameToStat.get('AnyMana')!.statId
    );
    if (anyCost !== undefined) {
      let anyValueRemaining = anyCost.value;
      if (goalManaSpend !== null) {
        for (const cost of goalManaSpend) {
          if (anyValueRemaining > 0) {
            this._payResourceCost(
              this.idToStat.get(cost.statId)!,
              Math.min(anyValueRemaining, cost.value),
              outList
            );
            anyValueRemaining -= cost.value;
          }
        }
      }

      for (const stat of this.stats) {
        if (anyValueRemaining > 0) {
          if (this.nameToStat.get('Life')!.statId !== stat.statId) {
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

    for (const playerResource of this.stats) {
      const tempPRC = new PayResourceCost(
        playerResource.statId,
        playerResource.effectiveValue
      );
      availableResources.push(tempPRC);
    }

    for (const cost of costs) {
      if (this.nameToStat.get('AnyMana').statId !== cost.statId) {
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
      if (c.statId !== this.nameToStat.get('Life').statId) {
        remainingMana += c.value;
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.nameToStat.get('AnyMana').statId
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
