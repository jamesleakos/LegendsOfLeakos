import EntityEffect from '../../EntityEffect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import { EffectValueType } from '../../../../Enums/Effect';

abstract class GiveKeywordBaseEffect extends EntityEffect {
  // Effect Creation Static Vars

  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [
      new EffectValueCreatorInfo(EffectValueType.KeywordDuration, true),
      new EffectValueCreatorInfo(EffectValueType.KeywordIsPermanent, true),
    ];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }
}

export default GiveKeywordBaseEffect;
