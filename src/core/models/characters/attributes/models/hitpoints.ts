import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Hitpoints extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['hp']);
    this.attributeManager = attributeManager;
    this.setCurrentValue(this.getValue());
  }

  changeCurrentValue(diff: number) {
    this.setCurrentValue(this.getCurrentValue() + diff);
  }

  getCurrentValue(): number {
    return super.getCurrentValue();
  }

  recieveDamage(damage: number) {
    this.changeCurrentValue(-damage);
    return this.getCurrentValue();
  }

  getValue(): number {
    const value = super.getValue() + this.getModsValue();
    return this.getRawValue() + value;
  }

  getRawValue(): number {
    return this.getStrValue();
  }

  private getStrValue() {
    return this.attributeManager.getByCode('str').getValue();
  }

  initDefaultValues() {
    this.setName('Hitpoints');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
