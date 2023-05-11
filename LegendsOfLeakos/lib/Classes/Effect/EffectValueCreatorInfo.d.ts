import { EffectValueType } from '../../Enums/Effect';
declare class EffectValueCreatorInfo {
    effectValueType: EffectValueType;
    creatorSets: boolean;
    constructor(effectValueType: EffectValueType, creatorSets: boolean);
}
export default EffectValueCreatorInfo;
