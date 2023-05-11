import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeKeyword from '../Keyword/RuntimeKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';
import RuntimeZone from '../Zone/RuntimeZone';
import LibraryEnchantment from './LibraryEnchantment';
declare class RuntimeEnchantment extends AbilityKeywordRuntimeEntity {
    libraryID: number;
    creatingEntity: AbilityKeywordRuntimeEntity;
    residingCard: RuntimeCard | null;
    imageName: string;
    constructor(libraryID: number, enchantmentLibrary: LibraryEnchantment[], instanceId: number, creatingEntity: AbilityKeywordRuntimeEntity, creatingPlayer: PlayerInfo, runtimeKeywords: RuntimeKeyword[], abilities: ActivatedAbility[], residingZone: RuntimeZone, residingCard?: RuntimeCard | null);
}
export default RuntimeEnchantment;
