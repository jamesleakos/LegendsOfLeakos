class TargetInfo {
  cardInstanceIdList: number[];
  zoneInstanceIdList: number[];
  targetsAreZones: boolean;
  noTargetWasSelected: boolean;
  targetsAreSelectedLater: boolean;

  constructor(
    cardInstanceIdList: number[],
    zoneInstanceIdList: number[],
    targetsAreZones: boolean,
    noTargetWasSelected: boolean,
    targetsAreSelectedLater: boolean
  ) {
    this.cardInstanceIdList = [...cardInstanceIdList];
    this.zoneInstanceIdList = [...zoneInstanceIdList];
    this.targetsAreZones = targetsAreZones;
    this.noTargetWasSelected = noTargetWasSelected;
    this.targetsAreSelectedLater = targetsAreSelectedLater;
  }
}

export default TargetInfo;
