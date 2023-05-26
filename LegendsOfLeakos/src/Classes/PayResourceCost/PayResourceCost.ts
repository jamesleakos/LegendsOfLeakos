import Stat from '../Stat/Stat';

class PayResourceCost {
  statId: number;
  value: number;

  constructor(statId: number, value: number) {
    this.statId = statId;
    this.value = value;
  }

  getReadableString(statDefinitions: any): string | null {
    const stat = statDefinitions.find((x: Stat) => x.statId === this.statId);
    if (stat !== undefined) {
      return `Pay ${this.value} ${stat.name.toLowerCase()}`;
    }
    return null;
  }

  static fromJSON(json: any): PayResourceCost {
    return new PayResourceCost(json.statId, json.value);
  }
}

export default PayResourceCost;
