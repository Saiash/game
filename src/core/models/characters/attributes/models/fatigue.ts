import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { dataValue } from '../../../../engine/models/store/types';

export class Fatigue extends Attribute {
  constructor(store: DataStore) {
    super(store, ['ft']);
  }

  getValue(): number {
    const value = this.getRawValue() + this.getModsValue();
    return super.getValue() + value;
  }

  getRawValue(): number {
    return this.getHtValue();
  }

  private getHtValue() {
    const [healtValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'ht',
      'value',
    ]);
    return parseInt(healtValue);
  }

  initDefaultValues() {
    this.setName('Fatigue');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
