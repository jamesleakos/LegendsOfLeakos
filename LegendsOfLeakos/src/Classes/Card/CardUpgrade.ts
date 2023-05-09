import ActivatedAbility from '../Ability/ActivatedAbility';
import ActivatedAbilityUpgrade from '../Ability/ActivatedAbilityUpgrade';
import GameManager from '../Game/GameManager';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
PayResourceCost;
import RuntimeCard from './RuntimeCard';
import Stat from '../../Classes/Stat/Stat';
import StatUpgrade from './StatUpgrade';
import KeywordUpgrade from '../Keyword/KeywordUpgrade';

class CardUpgrade {
  public name: string;
  public upgradeIndex: number;
  public isStartingUpgrade: boolean;
  public activatedAbility: ActivatedAbility;
  public costs: PayResourceCost[] = [];
  public upgradeNeighbors: number[] = [];
  public description: string;
  public attackStatUpgrade: StatUpgrade;
  public lifeStatUpgrade: StatUpgrade;
  public priorityStatUpgrade: StatUpgrade;
  public keywordUpgrades: KeywordUpgrade[] = [];
  public activatedAbilityUpgrades: ActivatedAbilityUpgrade[] = [];

  public potentialNeighbors(gameManager: GameManager): number[] {
    const width = gameManager.gameProperties.upgradeTreeShape.width;
    let tempList: number[] = [];
    tempList.push(this.upgradeIndex - width);
    tempList.push(this.upgradeIndex - 1);
    tempList.push(this.upgradeIndex + 1);
    tempList.push(this.upgradeIndex + width);

    return tempList;
  }

  public upgradeCard(card: RuntimeCard): void {
    const attack: Stat = card.attack;
    if (attack) this.attackStatUpgrade.upgradeStat(attack);

    const life: Stat = card.health;
    if (life) this.lifeStatUpgrade.upgradeStat(life);

    const priority: Stat = card.priority;
    if (priority) this.priorityStatUpgrade.upgradeStat(priority);

    for (const k of this.keywordUpgrades) {
      const keyword = card.runtimeKeywords.find(
        (c) => c.keywordType === k.keywordType
      );
      if (keyword) k.upgradeKeyword(keyword);
    }

    for (const a of this.activatedAbilityUpgrades) {
      if (card.activatedAbilities.length >= a.abilityUpgradeIndex) continue;
      a.upgradeAbility(card.activatedAbilities[a.abilityUpgradeIndex]);
    }

    card.upgradesApplied.push(this.upgradeIndex);
  }
}

export default CardUpgrade;
