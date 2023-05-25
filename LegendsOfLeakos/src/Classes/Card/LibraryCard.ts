import LibraryKeyword from '../Keyword/LibraryKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import BattlecryAbility from '../Ability/BattlecryAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import CardUpgrade from './CardUpgrade';
import DeckRequirement from '../DeckRequirement/DeckRequirement';
import { BiomeType, BiomeDepth } from '../../Enums/LandAndBiome';

class LibraryCard {
  libraryId: number;
  cardTypeId: number;
  name: String;
  biomeType: BiomeType;
  biomeDepth: BiomeDepth;
  cardText: String;
  imageName: String;
  costs: PayResourceCost[] = [];

  deckRequirements: DeckRequirement[] = [];

  // stats
  attack: number;
  health: number;
  priority: number;

  libraryKeywords: LibraryKeyword[] = [];
  activatedAbilities: ActivatedAbility[] = [];
  battlecryAbilities: BattlecryAbility[] = [];

  cardUpgrades: CardUpgrade[] = [];

  getCardUpgradeByUpgradeIndex(index: number): any {
    return this.cardUpgrades.find((c: any) => c.upgradeIndex === index);
  }

  static fromJSON(json: any): LibraryCard {
    const newCard = new LibraryCard();
    newCard.libraryId = json.libraryId;
    newCard.cardTypeId = json.cardTypeId;
    newCard.name = json.name;
    newCard.biomeType = json.biomeType;
    newCard.biomeDepth = json.biomeDepth;
    newCard.cardText = json.cardText;
    newCard.imageName = json.imageName;
    newCard.attack = json.attack;
    newCard.health = json.health;
    newCard.priority = json.priority;

    for (const c of json.costs) {
      newCard.costs.push(PayResourceCost.fromJSON(c));
    }

    for (const c of json.deckRequirements) {
      newCard.deckRequirements.push(DeckRequirement.fromJSON(c));
    }

    for (const c of json.libraryKeywords) {
      newCard.libraryKeywords.push(LibraryKeyword.fromJSON(c));
    }

    for (const c of json.activatedAbilities) {
      newCard.activatedAbilities.push(ActivatedAbility.fromJSON(c));
    }

    for (const c of json.battlecryAbilities) {
      newCard.battlecryAbilities.push(BattlecryAbility.fromJSON(c));
    }

    for (const c of json.cardUpgrades) {
      newCard.cardUpgrades.push(CardUpgrade.fromJSON(c));
    }

    return newCard;
  }
}

export default LibraryCard;
