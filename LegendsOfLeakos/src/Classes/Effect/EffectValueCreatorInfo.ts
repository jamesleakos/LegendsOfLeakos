import { EffectValueType } from '../../Enums/Effect';

class EffectValueCreatorInfo {
  public effectValueType: EffectValueType;
  public creatorSets: boolean;

  constructor(effectValueType: EffectValueType, creatorSets: boolean) {
    this.effectValueType = effectValueType;
    this.creatorSets = creatorSets;
  }
}

export default EffectValueCreatorInfo;
