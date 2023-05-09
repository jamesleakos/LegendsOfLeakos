import Effect from '../../Effect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import TargetInfo from '../../../Target/TargetInfo';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import Card from '../../../Card/Card';
import CardUpgrade from '../../../Card/CardUpgrade';
import GameManager from '../../../Game/GameManager';

class UpgradeCardEffect extends Effect {
  public upgradeIndex: number;

  constructor(upgradeLevel: number) {
    super();
    this.upgradeIndex = upgradeLevel;
  }

  public myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [];
    tempList = tempList.concat(super.myRequiredEffectValues());
    return tempList;
  }

  public numberOfTargetTypes(): number {
    return 0;
  }

  public targetTypeInfoList(): TargetTypeInfo[] {
    let list: TargetTypeInfo[] = [];
    return list;
  }

  public effectToString(): string {
    const outText: string = `Upgrade this card to upgrade with index ${this.upgradeIndex.toString()}`;
    return outText;
  }

  public preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    return true;
  }

  public resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[],
    gameManager: GameManager
  ): void {
    if (!(sourceEntity instanceof RuntimeCard)) {
      throw new Error('Why is non card entity attacking?');
    }

    const sourceCard: RuntimeCard = sourceEntity as RuntimeCard;
    const libraryCard: Card = gameManager.getCardFromLibraryId(
      sourceCard.libraryId
    );
    const upgrade: CardUpgrade = libraryCard.cardUpgrades.find(
      (x: Card) => x.upgradeIndex === this.upgradeIndex
    );

    upgrade.upgradeCard(sourceCard);
  }

  public areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetTypes: TargetType[]
  ): boolean {
    return true;
  }

  public areAllSelectedTargetInfoItemsValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[],
    targetTypes: TargetType[]
  ): boolean {
    return true;
  }

  public isTargetInfoStillValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo,
    targetType: TargetType
  ): boolean {
    return true;
  }
}
