import { EffectType } from '../../Enums/Effect';
import EffectValue from './EffectValue';
import { EffectValueType } from '../../Enums/Effect';
import TargetType from '../Target/TargetType';
import TargetInfo from '../Target/TargetInfo';
import TargetTypeInfo from '../Target/TargetTypeInfo';
import GameState from '../Game/GameState';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../Game/GameManager';
import EffectValueCreatorInfo from './EffectValueCreatorInfo';
type EffectFactoryPackage = {
    effect: Effect;
    wasSuccessful: boolean;
    message: string;
};
declare abstract class Effect {
    effectEnum: EffectType;
    effectValueList: Array<EffectValue>;
    targetTypes: Array<TargetType>;
    setEffectValueList(setEffectValueList: Array<EffectValue>): void;
    getEffectValueList(): Array<EffectValue>;
    getEffectValue(effectValueType: EffectValueType): EffectValue;
    modifyEffectValueInt(effectValueType: EffectValueType, index: number, modifyValue: number, modifyPermanent: boolean): void;
    resetEffectValues(): void;
    setTargetTypeList(setTargetTypeList: Array<TargetType>): void;
    getTargetTypeList(): Array<TargetType>;
    myRequiredEffectValues(): Array<EffectValueCreatorInfo>;
    abstract numberOfTargetTypes(): number;
    abstract targetTypeInfoList(): Array<TargetTypeInfo>;
    abstract effectToString(gameManager: GameManager): string;
    abstract areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetTypes: Array<TargetType>): boolean;
    abstract isTargetInfoStillValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetType: TargetType): boolean;
    abstract areAllSelectedTargetInfoItemsValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: Array<TargetInfo>, targetTypes: Array<TargetType>): boolean;
    abstract preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    onEndTurn(): void;
    static createEffect(effectEnum: EffectType, effectValueList: EffectValue[], targetTypes: TargetType[]): EffectFactoryPackage;
}
export default Effect;
