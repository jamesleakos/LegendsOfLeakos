import RuntimeKeyword from '../../RuntimeKeyword';
import Stat from '../../../Stat/Stat';
import StatBuff from '../../../Stat/StatBuff';
import CardCondition from '../../../Condition/CardCondition';
import EntitiesInSameZoneCondition from '../../../Condition/Conditions/EntitiesInSameZoneCondition';
import RuntimeCard from '../../../Card/RuntimeCard';
import GameState from '../../../Game/GameState';
import KeywordValue from '../../KeywordValue';
import { KeywordType, KeywordValueType } from '../../../../Enums/Keyword';
import { Condition } from '../../../Condition/Condition';

export class WarleaderKeyword extends RuntimeKeyword {
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

  public addStatBuff(
    stat: Stat,
    statCard: RuntimeCard,
    gameState: GameState
  ): StatBuff | null {
    for (const condition of this.conditions) {
      switch (condition.constructor) {
        case CardCondition:
          if (!(condition as CardCondition).isTrue(statCard)) return null;
          break;
        case EntitiesInSameZoneCondition:
          if (
            !(condition as EntitiesInSameZoneCondition).isTrue(
              statCard,
              this.myEntity
            )
          )
            return null;
          break;
        default:
          throw new Error('Case Not Implemented');
      }
    }

    switch (stat.name) {
      case 'Attack':
        if (
          this.keywordValueList.find(
            (c) => c.keywordValueType === KeywordValueType.statCardBuffAttack
          ) !== null
        ) {
          return new StatBuff(
            this.getKeywordValue(KeywordValueType.statCardBuffAttack),
            this.myEntity.name +
              ' is granting ' +
              this.getKeywordValue(
                KeywordValueType.statCardBuffAttack
              ).toString() +
              ' attack.'
          );
        }
        break;
      case 'Life':
        if (
          this.keywordValueList.find(
            (c) => c.keywordValueType === KeywordValueType.statCardBuffHealth
          ) !== null
        ) {
          return new StatBuff(
            this.getKeywordValue(KeywordValueType.statCardBuffHealth),
            this.myEntity.name +
              ' is granting ' +
              this.getKeywordValue(
                KeywordValueType.statCardBuffHealth
              ).toString() +
              ' health.'
          );
        }
        break;
      default:
        return null;
    }
    // shouldn't need this because of the switch but oh well
    return null;
  }
}

export default WarleaderKeyword;
