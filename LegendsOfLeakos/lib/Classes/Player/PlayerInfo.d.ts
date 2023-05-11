import Stat from '../Stat/Stat';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import { ZoneEnum } from '../../Enums/Zone';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeLandTile from '../RealmsAndLand/LandTile/RuntimeLandTile';
import RuntimeRealm from '../RealmsAndLand/Realm/RuntimeRealm';
declare class PlayerInfo {
    id: number;
    connectionId: number;
    netId: number;
    nickname: string;
    isConnected: boolean;
    isHuman: boolean;
    stats: Stat[];
    nameToStat: Map<string, Stat>;
    idToStat: Map<number, Stat>;
    zones: RuntimeZone[];
    landTiles: RuntimeLandTile[];
    realm: RuntimeRealm;
    currentEntityInstanceId: number;
    readyForBattleQueue: boolean;
    getCardFromInstanceId(cardInstanceId: number): RuntimeCard | null;
    getAllFriendlyCardsInPlay(): Array<RuntimeCard>;
    getFriendlyZoneContainingCard(cardInstanceId: number): number;
    getZoneFromInstanceId(zoneInstanceId: number): RuntimeZone | undefined;
    getFriendlyZoneFromEnum(zoneEnum: ZoneEnum): RuntimeZone | undefined;
    getFriendlyZoneFromZoneId(zoneZoneId: number): RuntimeZone | undefined;
    setPlayerManaFromLand(): void;
    payResourceCosts(costs: Array<PayResourceCost>, goalManaSpend?: Array<PayResourceCost> | null): Array<PayResourceCost> | null;
    private _payResourceCost;
    canPayResourceCosts(costs: Array<PayResourceCost>): boolean;
}
export default PlayerInfo;