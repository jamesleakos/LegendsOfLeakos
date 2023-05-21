import LibraryKeyword from '../Keyword/LibraryKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import BattlecryAbility from '../Ability/BattlecryAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import CardUpgrade from './CardUpgrade';
import { BiomeType, BiomeDepth } from '../../Enums/LandAndBiome';
declare class LibraryCard {
    libraryId: number;
    cardTypeId: number;
    name: String;
    biomeType: BiomeType;
    biomeDepth: BiomeDepth;
    cardText: String;
    imageName: String;
    costs: PayResourceCost[];
    deckRequirements: any[];
    attack: number;
    health: number;
    priority: number;
    libraryKeywords: LibraryKeyword[];
    activatedAbilities: ActivatedAbility[];
    battlecryAbilities: BattlecryAbility[];
    cardUpgrades: CardUpgrade[];
    getCardUpgradeByUpgradeIndex(index: number): any;
}
export default LibraryCard;
