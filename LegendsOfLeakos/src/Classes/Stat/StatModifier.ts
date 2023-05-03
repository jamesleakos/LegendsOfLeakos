class StatModifier {
  private static readonly PERMANENT = 0;
  value: number;
  duration: number;

  constructor(value: number, duration: number = StatModifier.PERMANENT) {
    this.value = value;
    this.duration = duration;
  }

  isPermanent(): boolean {
    return this.duration === StatModifier.PERMANENT;
  }
}

export default StatModifier;
