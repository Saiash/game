import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Speed extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['speed']);
    this.attributeManager = attributeManager;
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    return this.getRawValue() + value;
  }

  getRawValue(): number {
    return this.getHealtValue() * 0.25 + this.getDexValue() * 0.25;
  }

  private getDexValue() {
    return this.attributeManager.getByCode('dex').getValue();
  }

  private getHealtValue() {
    return this.attributeManager.getByCode('ht').getValue();
  }

  initDefaultValues() {
    this.setName('Speed');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
