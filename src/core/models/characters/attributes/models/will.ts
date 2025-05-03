import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Will extends Attribute {
  constructor(store: DataStore) {
    super(store, ['will']);
  }

  getValue(): number {
    return this.getIntValue() + super.getValue() + this.getModsValue();
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
    this.setName('Will');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
