import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { calculateEncumbrance } from '../../helpers/encumbrance';
import { AttributeManager } from '..';

export class Move extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['move']);
    this.attributeManager = attributeManager;
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
    return this.attributeManager.getByCode('speed').getValue();
  }

  private getWeightValue() {
    return this.attributeManager.getByCode('weight').getValue();
  }

  private getStrValue() {
    return this.attributeManager.getByCode('str').getValue();
  }

  initDefaultValues() {
    this.setName('Move');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
