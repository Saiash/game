import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Will extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['will']);
    this.attributeManager = attributeManager;
  }

  getValue(): number {
    return this.getIntValue() + super.getValue() + this.getModsValue();
  }

  getRawValue(): number {
    return this.getIntValue();
  }

  private getIntValue() {
    return this.attributeManager.getByCode('int').getValue();
  }

  initDefaultValues() {
    this.setName('Will');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
