import LibraryKeyword from '../Keyword/LibraryKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import BattlecryAbility from '../Ability/BattlecryAbility';
import CardUpgrade from '../CardUpgrade/CardUpgrade';
declare class LibraryCard {
    libraryId: number;
    cardTypeId: number;
    name: String;
    biomeType: any;
    biomeDepth: any;
    cardText: String;
    imageName: String;
    costs: any[];
    deckRequirements: any[];
    attack: number;
    health: number;
    priority: number;
    description: String;
    image: String;
    libraryKeywords: LibraryKeyword[];
    activatedAbilities: ActivatedAbility[];
    battlecryAbilities: BattlecryAbility[];
    cardUpgrades: CardUpgrade[];
    getCardUpgradeByUpgradeIndex(index: number): any;
}
export default LibraryCard;
