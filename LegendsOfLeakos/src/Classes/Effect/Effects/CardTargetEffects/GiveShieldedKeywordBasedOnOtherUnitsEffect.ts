import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import { EffectType, EffectValueType } from '../../../../Enums/Effect';
import EffectValue from '../../EffectValue';
import GameState from '../../../Game/GameState';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import { TargetTypeEnum } from '../../../../Enums/Target';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';

class GiveShieldedKeywordBasedOnOtherUnitsEffect extends GiveKeywordBaseEffect {
  effectEnum: EffectType;
  effectValues: EffectValue[];
  targetTypes: TargetType[];

  constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]) {
    super();
    this.effectEnum = EffectType.GiveShieldedKeywordBasedOnOtherUnits;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  static myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList = [
      new EffectValueCreatorInfo(
        EffectValueType.ShieldedKeywordShieldAmount,
        true
      ),
      new EffectValueCreatorInfo(
        EffectValueType.ShieldKeywordShieldingCardInstanceId,
        false
      ),
    ];
    tempList.push(...super.myRequiredEffectValues());
    return tempList;
  }

  static numberOfTargetTypes(): number {
    return 3;
  }

  static targetTypeInfoList(): TargetTypeInfo[] {
    let list = [
      new TargetTypeInfo(
        'Targets To Be Shielded',
        'These are the units that are shielded by this effect. At least one must remain in the targetableZoneIdList as of preEffect to prevent sizzle',
        'Targets must be cards',
        1,
        null
      ),
      new TargetTypeInfo(
        'Targets To Determine Shield Amount',
        'These two targets must remain as of preEffect(). They determine the shield amount by the difference in their attack.',
        'Targets must be cards',
        2,
        2
      ),
      new TargetTypeInfo(
        'These targets will provide the shielding',
        'These are the unit or units that provide the shielding. At least one must remain as of resolve();',
        'Targets must be cards',
        1,
        null
      ),
    ];
    return list;
  }

  effectToString(): string {
    let outText =
      'Give shield to a unit with strength determined by the difference in attack of two other target units.';
    return outText;
  }

  preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    // Your code here...
  }

  resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    // Your code here...
  }
}

export default GiveShieldedKeywordBasedOnOtherUnitsEffect;
