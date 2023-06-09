import { EffectType } from '../../Enums/Effect';
import EffectValue from './EffectValue';
import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import IntModifier from '../ModifableInt/IntModifier';
import TargetType from '../Target/TargetType';
import TargetInfo from '../Target/TargetInfo';
import TargetTypeInfo from '../Target/TargetTypeInfo';
import GameState from '../Game/GameState';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../Game/GameManager';
import EffectValueCreatorInfo from './EffectValueCreatorInfo';
import DealSetDamageEffect from './Effects/CardTargetEffects/DealSetDamageEffect';
import DealDamageEqualToAttackEffect from './Effects/CardTargetEffects/DealDamageEqualToAttackEffect';
import GiveShieldedKeywordEffect from './Effects/CardTargetEffects/GiveShieldedKeywordEffect';
import GiveShieldedKeywordBasedOnOtherUnitsEffect from './Effects/CardTargetEffects/GiveShieldedKeywordBasedOnOtherUnitsEffect';
import NormalAttackEffect from './Effects/AttackEffects/NormalAttackEffect';
import EnchantCardEffect from './Effects/EnchantEffects/EnchantCardEffect';
import EnchantZoneEffect from './Effects/EnchantEffects/EnchantZoneEffect';

type EffectFactoryPackage = {
  effect: Effect;
  wasSuccessful: boolean;
  message: string;
};

// Base class of an effect. It consists of a type (which is associated with a child class, which holds the logic for execution of the effect),
// a list of EffectValues,
abstract class Effect {
  public effectEnum: EffectType;
  public effectValueList: Array<EffectValue>;
  public targetTypes: Array<TargetType>;

  // Get and Set Effect Values
  setEffectValueList(setEffectValueList: Array<EffectValue>): void {
    this.effectValueList = [];
    for (const ev of setEffectValueList) {
      this.effectValueList.push(
        new EffectValue(ev.effectValueType, ev.setValue, ev.modInts)
      );
    }
  }

  getEffectValueList(): Array<EffectValue> {
    return this.effectValueList;
  }

  getEffectValue(effectValueType: EffectValueType): EffectValue {
    const value = this.effectValueList.find(
      (x) => x.effectValueType === effectValueType
    );

    if (value === undefined) {
      throw new Error('Did not find this value');
    }
    return value;
  }

  modifyEffectValueInt(
    effectValueType: EffectValueType,
    index: number,
    modifyValue: number,
    modifyPermanent: boolean
  ): void {
    this.effectValueList
      .find((x) => x.effectValueType === effectValueType)
      .modInts[index].effectValueIntModifiers.push(
        new IntModifier(modifyValue, modifyPermanent)
      );
  }

  resetEffectValues(): void {
    for (const ev of this.effectValueList) {
      ev.postEffect();
    }
  }

  // Get and Set Target Types
  setTargetTypeList(setTargetTypeList: Array<TargetType>): void {
    this.targetTypes = [];
    for (const tt of setTargetTypeList) {
      this.targetTypes.push(
        new TargetType(
          tt.name,
          tt.targetTypeEnum,
          tt.minSelectionsRequired,
          tt.maxSelectionsAllowed,
          tt.minSelectionsThatMustRemain,
          tt.targetableTypeSelectionEnum,
          tt.conditions
        )
      );
    }
  }

  getTargetTypeList(): Array<TargetType> {
    return this.targetTypes;
  }

  // Card Builder Helpers for Human Creators
  myRequiredEffectValues(): Array<EffectValueCreatorInfo> {
    return [];
  }

  abstract numberOfTargetTypes(): number;

  abstract targetTypeInfoList(): Array<TargetTypeInfo>;

  // Effect Card Text
  abstract effectToString(gameManager: GameManager): string;

  abstract areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetTypes: Array<TargetType>
  ): boolean;

  // Evaluating Targets
  abstract isTargetInfoStillValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo,
    targetType: TargetType
  ): boolean;

  abstract areAllSelectedTargetInfoItemsValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: Array<TargetInfo>,
    targetTypes: Array<TargetType>
  ): boolean;

  abstract preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): boolean;

  public resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): void {
    // Optional override
  }

  public onEndTurn(): void {
    this.resetEffectValues();
  }

  public static createEffect(
    effectEnum: EffectType,
    effectValueList: EffectValue[],
    targetTypes: TargetType[]
  ): EffectFactoryPackage {
    let outEffect: Effect | null = null;
    if (effectEnum === EffectType.DealSetDamage) {
      outEffect = new DealSetDamageEffect(effectValueList, targetTypes);
    }
    if (effectEnum === EffectType.DealDamageEqualToAttack) {
      outEffect = new DealDamageEqualToAttackEffect(
        effectValueList,
        targetTypes
      );
    }
    if (effectEnum === EffectType.GiveShieldedKeyword) {
      outEffect = new GiveShieldedKeywordEffect(effectValueList, targetTypes);
    }
    if (effectEnum === EffectType.GiveShieldedKeywordBasedOnOtherUnits) {
      outEffect = new GiveShieldedKeywordBasedOnOtherUnitsEffect(
        effectValueList,
        targetTypes
      );
    }
    if (effectEnum === EffectType.NormalAttack) {
      outEffect = new NormalAttackEffect(effectValueList, targetTypes);
    }
    if (effectEnum === EffectType.EnchantCard) {
      outEffect = new EnchantCardEffect(effectValueList, targetTypes);
    }
    if (effectEnum === EffectType.EnchantZone) {
      outEffect = new EnchantZoneEffect(effectValueList, targetTypes);
    }

    let success = true;
    let message = 'Effect created successfully';

    if (outEffect === null) {
      success = false;
      message = 'Effect was not created. Check if EffectEnum was correct';
    }
    for (const ev of effectValueList) {
      if (
        outEffect
          .myRequiredEffectValues()
          .find((c) => c.effectValueType === ev.effectValueType) === null
      ) {
        success = false;
        message =
          'Missing required effectvalue ' + ev.effectValueType.toString();
      }
    }
    if (outEffect.numberOfTargetTypes() !== targetTypes.length) {
      success = false;
      message = 'Number of target types do not match';
    }

    return { effect: outEffect, wasSuccessful: success, message: message };
  }

  toJSON(): any {
    return {
      effectEnum: this.effectEnum.toString(),
      effectValueList: this.effectValueList.map((ev) => ev.toJSON()),
      targetTypes: this.targetTypes.map((tt) => tt.toJSON()),
    };
  }

  static fromJSON(json: any): Effect {
    //from string
    const effectEnum = EffectType[json.effectEnum as keyof typeof EffectType];
    const effectValueList = json.effectValueList.map((ev: any) =>
      EffectValue.fromJSON(ev)
    );
    const targetTypes = json.targetTypes.map((tt: any) =>
      TargetType.fromJSON(tt)
    );

    const { effect, wasSuccessful, message } = Effect.createEffect(
      effectEnum,
      effectValueList,
      targetTypes
    );

    if (!wasSuccessful) {
      throw new Error(message);
    }

    return effect;
  }
}

export default Effect;
