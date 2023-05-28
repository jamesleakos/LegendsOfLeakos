import ModifiableInt from '../ModifableInt/ModifiableInt';

class PayResourceCostUpgrade {
  public statId: number;
  public valueChange: ModifiableInt;

  constructor(statId: number, valueChange: ModifiableInt) {
    this.statId = statId;
    this.valueChange = new ModifiableInt(
      valueChange.baseValue,
      valueChange.effectValueIntModifiers
    );
  }

  static fromJSON(json: any): PayResourceCostUpgrade {
    return new PayResourceCostUpgrade(
      json.statId,
      ModifiableInt.fromJSON(json.valueChange)
    );
  }
}

export default PayResourceCostUpgrade;
