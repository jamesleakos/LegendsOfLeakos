import {
  TargetTypeEnum,
  TargetTypeEnumMethods,
  TargetableTypeSelectionEnum,
  TargetableTypeSelectionEnumMethods,
  BroadTargetTypeEnum,
} from '../../Enums/Target';

import { Condition } from '../Condition/Condition';
import CardCondition from '../Condition/CardCondition';
import ZoneCondition from '../Condition/ZoneCondition';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeCard from '../Card/RuntimeCard';
import GameState from '../Game/GameState';
import TargetInfo from './TargetInfo';
import RuntimeZone from '../Zone/RuntimeZone';

class TargetType {
  name: string;
  targetTypeEnum: TargetTypeEnum;
  targetableTypeSelectionEnum: TargetableTypeSelectionEnum;
  minSelectionsRequired: number;
  maxSelectionsAllowed: number;
  minSelectionsThatMustRemain: number;
  conditions: Array<Condition> = [];

  playerSelectsTarget: boolean;

  constructor(
    name: string,
    targetTypeEnum: TargetTypeEnum,
    minSelectionsRequired: number,
    maxSelectionsAllowed: number,
    minSelectionsThatMustRemain: number,
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum,
    conditions: Array<Condition>
  ) {
    this.name = name;
    this.targetTypeEnum = targetTypeEnum;
    this.minSelectionsRequired = minSelectionsRequired;
    this.maxSelectionsAllowed = maxSelectionsAllowed;
    this.minSelectionsThatMustRemain = minSelectionsThatMustRemain;
    this.targetableTypeSelectionEnum = targetableTypeSelectionEnum;

    this.playerSelectsTarget =
      TargetableTypeSelectionEnumMethods.playerSelectsTargets(
        this.targetableTypeSelectionEnum
      );

    if (!TargetTypeEnumMethods.canBeTargetable(this.targetTypeEnum)) {
      if (this.playerSelectsTarget) {
        console.log('Player can never select that target');
      }
      for (const c of conditions) {
        this.conditions.push(
          Condition.createCondition(c.conditionType, c.conditionValues)
            .condition
        );
      }
    }
  }

  getTargetTypeEnum(): TargetTypeEnum {
    return this.targetTypeEnum;
  }

  autoSelectTargetInfo(
    sourcePlayer: PlayerInfo,
    sourceCard: RuntimeCard,
    gameState: GameState
  ): TargetInfo {
    let cardInstanceIds: Array<number> = [];
    let zoneInstanceIds: Array<number> = [];

    // Implement the logic for each targetTypeEnum case here
    // ...

    let outCardInts: Array<number> = [];
    let outZoneInts: Array<number> = [];
    for (let i = 0; i < this.maxSelectionsAllowed; i++) {
      if (cardInstanceIds.length > i) {
        outCardInts.push(cardInstanceIds[i]);
      }
      if (zoneInstanceIds.length > i) {
        outZoneInts.push(zoneInstanceIds[i]);
      }
    }

    return new TargetInfo(
      outCardInts,
      outZoneInts,
      TargetTypeEnumMethods.broadTargetType(this.targetTypeEnum) ===
        BroadTargetTypeEnum.zone,
      cardInstanceIds.length === 0 && zoneInstanceIds.length === 0,
      false
    );
  }

  cardSatisfiesConditions(sourceCard: RuntimeCard): boolean {
    for (const c of this.conditions) {
      if (!(c instanceof CardCondition)) return false;
      if (!(c as CardCondition).isTrue(sourceCard)) return false;
    }
    return true;
  }

  zoneSatisfiesConditions(zone: RuntimeZone): boolean {
    for (const c of this.conditions) {
      if (!(c instanceof ZoneCondition)) return false;
      if (!(c as ZoneCondition).isTrue(zone)) return false;
    }
    return true;
  }

  static getFightTargetType(): TargetType {
    return new TargetType(
      'Attacking Target Type',
      TargetTypeEnum.TargetOpponentCreature,
      1,
      1,
      1,
      TargetableTypeSelectionEnum.TargetableOnActivation,
      []
    );
  }

  toJSON(): any {
    return {
      name: this.name,
      targetTypeEnum: this.targetTypeEnum.toString(),
      minSelectionsRequired: this.minSelectionsRequired,
      maxSelectionsAllowed: this.maxSelectionsAllowed,
      minSelectionsThatMustRemain: this.minSelectionsThatMustRemain,
      targetableTypeSelectionEnum: this.targetableTypeSelectionEnum.toString(),
      conditions: this.conditions.map((c) => c.toJSON()),
    };
  }

  static fromJSON(targetTypeJSON: any): TargetType {
    return new TargetType(
      targetTypeJSON.name,
      TargetTypeEnum[
        targetTypeJSON.targetTypeEnum as keyof typeof TargetTypeEnum
      ],
      targetTypeJSON.minSelectionsRequired,
      targetTypeJSON.maxSelectionsAllowed,
      targetTypeJSON.minSelectionsThatMustRemain,
      TargetableTypeSelectionEnum[
        targetTypeJSON.targetableTypeSelectionEnum as keyof typeof TargetableTypeSelectionEnum
      ],
      targetTypeJSON.conditions.map((c: any) => Condition.fromJSON(c))
    );
  }
}

export default TargetType;
