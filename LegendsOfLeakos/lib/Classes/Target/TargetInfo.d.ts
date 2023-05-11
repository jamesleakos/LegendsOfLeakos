declare class TargetInfo {
    cardInstanceIdList: number[];
    zoneInstanceIdList: number[];
    targetsAreZones: boolean;
    noTargetWasSelected: boolean;
    targetsAreSelectedLater: boolean;
    constructor(cardInstanceIdList: number[], zoneInstanceIdList: number[], targetsAreZones: boolean, noTargetWasSelected: boolean, targetsAreSelectedLater: boolean);
}
export default TargetInfo;
