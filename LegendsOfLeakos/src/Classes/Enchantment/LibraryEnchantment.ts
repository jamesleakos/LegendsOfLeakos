import LibraryKeyword from '../Keyword/LibraryKeyword';
import ActivatedAbility from '../Ability/ActivatedAbility';

class LibraryEnchantment {
  libraryId: number;
  name: string;
  description: string;
  keywords: LibraryKeyword[];
  activatedAbilities: ActivatedAbility[];
  imageName: string;
}

export default LibraryEnchantment;
