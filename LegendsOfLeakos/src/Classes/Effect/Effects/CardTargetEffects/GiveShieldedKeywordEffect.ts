import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import EffectValue from '../../EffectValue';
import TargetType from '../../../Target/TargetType';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import { EffectType, EffectValueType } from '../../../../Enums/Effect';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import { KeywordType, KeywordValueType } from '../../../../Enums/Keyword';
import KeywordValue from '../../../Keyword/KeywordValue';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';

class GiveShieldedKeywordEffect extends GiveKeywordBaseEffect {
  // Effect Creation Static Vars
  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues() {
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
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes() {
    return 1;
  }

  override targetTypeInfoList() {
    let list = [];
    list.push(
      new TargetTypeInfo(
        'Targets To Be Shielded', // name
        'These are the units that are shielded by this effect. At least one must remain in the targetableZoneIdList as of PreEffect to prevent sizzle', // description
        'Targets must be cards',
        1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
      )
    );
    return list;
  }

  override effectToString() {
    let outText =
      'Give shield strength ' +
      this.getEffectValue(EffectValueType.ShieldedKeywordShieldAmount)
        .setValue +
      ' to a target. It will last as long as this unit.';
    return outText;
  }

  constructor(
    setEffectValues: Array<EffectValue>,
    setTargetTypes: Array<TargetType>
  ) {
    super();
    this.effectEnum = EffectType.GiveShieldedKeyword;
    this.setEffectValueList(setEffectValues);
    this.setTargetTypeList(setTargetTypes);
  }

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ) {
    let targetsToBeShielded = targetInfoList[0];

    let shieldAmountEV = this.getEffectValue(
      EffectValueType.ShieldedKeywordShieldAmount
    );
    let shieldingCardsEV = this.getEffectValue(
      EffectValueType.ShieldKeywordShieldingCardInstanceId
    );

    shieldAmountEV.fitToTargetInfo(targetsToBeShielded);
    shieldingCardsEV.fitToTargetInfo(targetsToBeShielded);

    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        targetsToBeShielded,
        this.targetTypes[0]
      )
    )
      return false;

    for (let i = 0; i < shieldAmountEV.modInts.length; i++) {
      shieldAmountEV.modInts[i].baseValue = shieldAmountEV.setValue;
      shieldingCardsEV.modInts[i].baseValue = sourceEntity.instanceId;
    }

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ) {
    let cardsToGiveKeyword = targetInfoList[0];
    let cardsToGiveKeywordTargetType = this.targetTypes[0];
    if (
      !this.isTargetInfoStillValid(
        sourceEntity,
        state,
        cardsToGiveKeyword,
        this.targetTypes[0]
      )
    )
      return;

    let shieldAmountEV = this.getEffectValue(
      EffectValueType.ShieldedKeywordShieldAmount
    );
    let shieldingCardsEV = this.getEffectValue(
      EffectValueType.ShieldKeywordShieldingCardInstanceId
    );

    for (let i = 0; i < cardsToGiveKeyword.cardInstanceIdList.length; i++) {
      let currentTargetCard = state.getCardFromAnywhere(
        cardsToGiveKeyword.cardInstanceIdList[i]
      );
      if (
        !cardsToGiveKeywordTargetType.cardSatisfiesConditions(currentTargetCard)
      )
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
        [], // new list of Condition
        'Hard code in image name here'
      );
    }
  }
}

export default GiveShieldedKeywordEffect;
