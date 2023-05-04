import LibraryKeyword from '../Keyword/LibraryKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import BattlecryAbility from '../Ability/BattlecryAbility';
import CardUpgrade from '../CardUpgrade/CardUpgrade';

class LibraryCard {
  libraryId: number;
  cardTypeId: number;
  name: String;
  biomeType: any;
  biomeDepth: any;
  cardText: String;
  imageName: String;
  costs: any[] = [];
  // TODO : add requirement class to replace 'any'
  deckRequirements: any[] = [];
  // stats
  attack: number;
  health: number;
  priority: number;
  // properties
  description: String;
  image: String;
  // TODO: add keywords class to replace 'any'
  libraryKeywords: LibraryKeyword[] = [];
  // TODO: add abilities class to replace 'any'
  activatedAbilities: ActivatedAbility[] = [];
  // TODO: add abilities class to replace 'any'
  battlecryAbilities: BattlecryAbility[] = [];
  // TODO: add upgrades class to replace 'any'
  cardUpgrades: CardUpgrade[] = [];

  getCardUpgradeByUpgradeIndex(index: number): any {
    return this.cardUpgrades.find((c: any) => c.upgradeIndex === index);
  }
}

export default LibraryCard;
