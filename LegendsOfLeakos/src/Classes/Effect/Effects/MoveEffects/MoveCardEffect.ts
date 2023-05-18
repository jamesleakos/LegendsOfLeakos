import Effect from '../../Effect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import TargetInfo from '../../../Target/TargetInfo';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import { ZoneEnum } from '../../../../Enums/Zone';

class MoveCardEffect extends Effect {
  public originZoneEnum: ZoneEnum;
  public destinationZoneEnum: ZoneEnum;

  // Effect Creation Static Vars

  // variables and methods to help with the creation of these effects by a person in the card creator
  override myRequiredEffectValues(): EffectValueCreatorInfo[] {
    let tempList: EffectValueCreatorInfo[] = [];
    for (let x of super.myRequiredEffectValues()) {
      tempList.push(x);
    }
    return tempList;
  }

  override numberOfTargetTypes(): number {
    return 0;
  }

  override targetTypeInfoList(): TargetTypeInfo[] {
    let list: TargetTypeInfo[] = [];
    return list;
  }

  // Effect To Text

  override effectToString(): string {
    let outText: string =
      'Move this card from ' +
      this.originZoneEnum +
      ' to ' +
      this.destinationZoneEnum +
      '. ';
    return outText;
  }

  public cardTypeId: number;

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    if (sourceEntity.residingZone.zoneEnum !== this.originZoneEnum)
      return false;

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    // shouldn't be trying to move a non-card
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    let sourceCard: RuntimeCard = sourceEntity as RuntimeCard;

    let player = sourceCard.ownerPlayer;

    // make sure it's still where it thinks it is
    if (sourceCard.residingZone.zoneEnum !== this.originZoneEnum) {
      console.log('Returning out of resolve');
      return;
    }

    let originZone = player.zones.find(
      (c) => c.zoneEnum === this.originZoneEnum
    );
    let destinationZone = player.zones.find(
      (c) => c.zoneEnum === this.destinationZoneEnum
    );

    originZone.removeCard(sourceCard);
    destinationZone.addCard(sourceCard);
  }

  override areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetTypes: TargetType[]
  ): boolean {
    return true;
  }

  override isTargetInfoStillValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo,
    targetType: TargetType
  ): boolean {
    return true;
  }

  override areAllSelectedTargetInfoItemsValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[],
    targetTypes: TargetType[]
  ): boolean {
    return true;
  }
}

export default MoveCardEffect;
