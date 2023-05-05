import {
  ZoneEnum,
  ZoneEnumMethods,
  ZoneOwner,
  ZoneType,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
} from '../../Enums/Zone';

class GameZoneType {
  // The name of this zone.
  public name: string;

  public zoneEnum: ZoneEnum;

  // The owner of this zone.
  public owner: ZoneOwner;

  // The type of this zone.
  public type: ZoneType;

  // The visibility of this zone for the owner player.
  public ownerVisibility: ZoneOwnerVisibility;

  // The visibility of this zone for the opponent player.
  public opponentVisibility: ZoneOpponentVisibility;

  // True if this zone has a maximum size.
  public hasMaxSize: boolean;

  // The maximum size of this number.
  public maxSize: number;

  constructor(
    name: string,
    zoneEnum: ZoneEnum,
    owner: ZoneOwner,
    type: ZoneType,
    ownerVisibility: ZoneOwnerVisibility,
    opponentVisibility: ZoneOpponentVisibility,
    hasMaxSize: boolean,
    maxSize: number
  ) {
    this.name = name;
    this.zoneEnum = zoneEnum;
    this.owner = owner;
    this.type = type;
    this.ownerVisibility = ownerVisibility;
    this.opponentVisibility = opponentVisibility;
    this.hasMaxSize = hasMaxSize;
    this.maxSize = maxSize;
  }
}

export { GameZoneType };
