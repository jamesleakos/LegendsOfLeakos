import Stat from './Stat';
import StatModifier from './StatModifier';
import ModifiableInt from '../ModifableInt/ModifiableInt';

export class StatUpgrade {
  statId: number;
  value: ModifiableInt;

  constructor(statId: number, value: ModifiableInt) {
    this.statId = statId;
    this.value = value;
  }

  upgradeStat(stat: Stat): void {
    if (stat.statId !== this.statId) return;
    const mod = new StatModifier(this.value.effectiveValue);

    stat.addModifier(mod);
  }
}

export default StatUpgrade;