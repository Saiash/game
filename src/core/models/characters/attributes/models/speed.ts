import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Speed extends Attribute {
  constructor(store: DataStore) {
    super(store, ['speed']);
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    return this.getRawValue() + value;
  }

  getRawValue(): number {
    return this.getHealtValue() * 0.25 + this.getDexValue() * 0.25;
  }

  private getDexValue() {
    const [dexValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'dex',
      'value',
    ]);
    return parseInt(dexValue);
  }

  private getHealtValue() {
    const [healtValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'ht',
      'value',
    ]);
    return parseInt(healtValue);
  }

  initDefaultValues() {
    this.setName('Speed');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
