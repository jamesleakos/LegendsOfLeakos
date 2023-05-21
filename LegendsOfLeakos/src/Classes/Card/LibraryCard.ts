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
}

export default LibraryCard;
