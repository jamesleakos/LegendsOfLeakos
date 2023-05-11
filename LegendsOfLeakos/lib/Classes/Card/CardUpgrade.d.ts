import ActivatedAbility from '../Ability/ActivatedAbility';
import ActivatedAbilityUpgrade from '../Ability/ActivatedAbilityUpgrade';
import GameManager from '../Game/GameManager';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeCard from './RuntimeCard';
import StatUpgrade from '../Stat/StatUpgrade';
import KeywordUpgrade from '../Keyword/KeywordUpgrade';
declare class CardUpgrade {
    name: string;
    upgradeIndex: number;
    isStartingUpgrade: boolean;
    activatedAbility: ActivatedAbility;
    costs: PayResourceCost[];
    upgradeNeighbors: number[];
    description: string;
    attackStatUpgrade: StatUpgrade;
    lifeStatUpgrade: StatUpgrade;
    priorityStatUpgrade: StatUpgrade;
    keywordUpgrades: KeywordUpgrade[];
    activatedAbilityUpgrades: ActivatedAbilityUpgrade[];
    potentialNeighbors(gameManager: GameManager): number[];
    upgradeCard(card: RuntimeCard): void;
}
export default CardUpgrade;
