import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Perception extends Attribute {
  constructor(store: DataStore) {
    super(store, ['per']);
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    return this.getIntValue() + value;
  }

  getRawValue(): number {
    return this.getIntValue();
  }

  private getIntValue() {
    const [intValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'int',
      'value',
    ]);
    return parseInt(intValue);
  }

  initDefaultValues() {
    this.setName('Perception');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
