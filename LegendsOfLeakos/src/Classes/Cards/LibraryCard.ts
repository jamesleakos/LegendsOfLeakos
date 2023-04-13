class LibraryCard {
  libraryId: number;
  cardTypeId: number;
  name: String;
  biomeType: any;
  biomeDepth: any;
  cardText: String;
  imageName: String;
  costs: any[] = [];
  // TODO : add requirement class to replace 'any'
  deckRequirements: any[] = [];
  // TODO : add stats - not in a list of stats though
  // TODO : add properties - not in a list of properties though
  // TODO: add keywords class to replace 'any'
  libraryKeywords: any[] = [];
  // TODO: add abilities class to replace 'any'
  activatedAbilities: any[] = [];
  // TODO: add abilities class to replace 'any'
  battlecryAbilities: any[] = [];
  // TODO: add upgrades class to replace 'any'
  cardUpgrades: any[] = [];

  getCardUpgradeByUpgradeIndex(index: number): any {
    return this.cardUpgrades.find((c: any) => c.upgradeIndex === index);
  }
}

export default LibraryCard;
