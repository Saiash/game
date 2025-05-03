import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { calculateEncumbrance } from '../../helpers/encumbrance';

export class Move extends Attribute {
  constructor(store: DataStore) {
    super(store, ['move']);
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    const encumbrance = calculateEncumbrance(
      this.getWeightValue(),
      this.getStrValue()
    );
    return Math.max(
      ...[Math.floor(this.getSpeedValue() * (1 - encumbrance * 0.2)) + value, 1]
    );
  }

  getSwimingValue(): number {
    return Math.max(...[this.getValue() / 5, 1]);
  }

  getRawValue(): number {
    return Math.floor(this.getSpeedValue());
  }

  private getSpeedValue() {
    const [speedValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'speed',
      'value',
    ]);
    return parseInt(speedValue);
  }

  private getWeightValue() {
    const [weightValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'weight',
      'value',
    ]);
    return parseInt(weightValue);
  }

  private getStrValue() {
    const [strValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'str',
      'value',
    ]);
    return parseInt(strValue);
  }

  initDefaultValues() {
    this.setName('Move');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
