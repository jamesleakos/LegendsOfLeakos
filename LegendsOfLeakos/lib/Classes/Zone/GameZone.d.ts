import { ZoneEnum, ZoneOwner, ZoneType, ZoneOwnerVisibility, ZoneOpponentVisibility } from '../../Enums/Zone';
declare class GameZoneType {
    name: string;
    zoneEnum: ZoneEnum;
    owner: ZoneOwner;
    type: ZoneType;
    ownerVisibility: ZoneOwnerVisibility;
    opponentVisibility: ZoneOpponentVisibility;
    hasMaxSize: boolean;
    maxSize: number;
    constructor(name: string, zoneEnum: ZoneEnum, owner: ZoneOwner, type: ZoneType, ownerVisibility: ZoneOwnerVisibility, opponentVisibility: ZoneOpponentVisibility, hasMaxSize: boolean, maxSize: number);
}
export { GameZoneType };
