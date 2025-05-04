import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Perception extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['per']);
    this.attributeManager = attributeManager;
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    return this.getIntValue() + value;
  }

  getRawValue(): number {
    return this.getIntValue();
  }

  private getIntValue() {
    return this.attributeManager.getByCode('int').getValue();
  }

  initDefaultValues() {
    this.setName('Perception');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
