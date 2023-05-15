import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import { EffectType, EffectValueType } from '../../../../Enums/Effect';
import EffectValue from '../../EffectValue';
import GameState from '../../../Game/GameState';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import { TargetTypeEnum } from '../../../../Enums/Target';
import KeywordValue from '../../../Keyword/KeywordValue';
import { KeywordType, KeywordValueType } from '../../../../Enums/Keyword';
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

  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
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

  override numberOfTargetTypes(): number {
    return 3;
  }

  override targetTypeInfoList(): TargetTypeInfo[] {
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

  override effectToString(): string {
    let outText =
      'Give shield to a unit with strength determined by the difference in attack of two other target units.';
    return outText;
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    const targetsToBeShielded = targetInfoList[0];
    const cardsDeterminingShields = targetInfoList[1];
    const shieldingCards = targetInfoList[2];

    const shieldAmountEV = this.getEffectValue(
      EffectValueType.ShieldedKeywordShieldAmount
    );
    const shieldingCardsEV = this.getEffectValue(
      EffectValueType.ShieldKeywordShieldingCardInstanceId
    );

    shieldAmountEV.fitToTargetInfo(targetsToBeShielded);
    shieldingCardsEV.fitToTargetInfo(shieldingCards);

    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        targetsToBeShielded,
        this.targetTypes[0]
      )
    ) {
      return false;
    }
    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        cardsDeterminingShields,
        this.targetTypes[1]
      )
    ) {
      return false;
    }
    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        shieldingCards,
        this.targetTypes[2]
      )
    ) {
      return false;
    }

    const card1 = state.getCardFromAnywhere(
      cardsDeterminingShields.cardInstanceIdList[0]
    );
    const card2 = state.getCardFromAnywhere(
      cardsDeterminingShields.cardInstanceIdList[1]
    );

    for (let i = 0; i < shieldAmountEV.modInts.length; i++) {
      shieldAmountEV.modInts[i].baseValue = Math.abs(
        card1.attack.effectiveValue - card2.attack.effectiveValue
      );
    }

    for (let i = 0; i < shieldingCardsEV.modInts.length; i++) {
      shieldingCardsEV.modInts[i].baseValue =
        shieldingCards.cardInstanceIdList[i];
    }

    return true;
  }

  resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    const targetsToBeShielded = targetInfoList[0];
    const cardsDeterminingShields = targetInfoList[1];
    const shieldingCards = targetInfoList[2];

    const targetsToBeShieldedType = this.targetTypes[0];

    const shieldAmountEV = this.getEffectValue(
      EffectValueType.ShieldedKeywordShieldAmount
    );
    const shieldingCardsEV = this.getEffectValue(
      EffectValueType.ShieldKeywordShieldingCardInstanceId
    );

    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        shieldingCards,
        this.targetTypes[2]
      )
    )
      return;

    for (let i = 0; i < targetsToBeShielded.cardInstanceIdList.length; i++) {
      const currentTargetCard = state.getCardFromAnywhere(
        targetsToBeShielded.cardInstanceIdList[i]
      );

      if (!targetsToBeShieldedType.cardSatisfiesConditions(currentTargetCard))
        break;

      currentTargetCard.addKeyword(
        KeywordType.Shielded,
        null,
        'Add Shielded Description Somewhere, maybe here',
        this.getEffectValue(EffectValueType.KeywordIsPermanent).modInts[i]
          .effectiveValue === 1,
        this.getEffectValue(EffectValueType.KeywordDuration).modInts[i]
          .effectiveValue,
        [
          new KeywordValue(
            KeywordValueType.shieldAmount,
            shieldAmountEV.effectiveValues()
          ),
          new KeywordValue(
            KeywordValueType.shieldingCardInstanceId,
            shieldingCardsEV.effectiveValues()
          ),
        ],
        true, // of course it should be active
        [], // new List<Condition>()
        'Hard code in image name here'
      );
    }
  }
}

export default GiveShieldedKeywordBasedOnOtherUnitsEffect;
