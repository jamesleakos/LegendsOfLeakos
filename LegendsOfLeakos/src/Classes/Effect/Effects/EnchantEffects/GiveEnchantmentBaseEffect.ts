import { EffectValueType } from '../../../../Enums/Effect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import EntityEffect from '../../EntityEffect';

abstract class GiveEnchantmentBaseEffect extends EntityEffect {
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [
      new EffectValueCreatorInfo(
        EffectValueType.CreateEnchantmentEnchantmentLibraryID,
        true
      ),
    ];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }
}

export default GiveEnchantmentBaseEffect;
