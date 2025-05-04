import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Fatigue extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['ft']);
    this.attributeManager = attributeManager;
  }

  getValue(): number {
    const value = this.getRawValue() + this.getModsValue();
    return super.getValue() + value;
  }

  getRawValue(): number {
    return this.getHtValue();
  }

  private getHtValue() {
    return this.attributeManager.getByCode('ht').getValue();
  }

  initDefaultValues() {
    this.setName('Fatigue');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
