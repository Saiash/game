import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Hitpoints extends Attribute {
  constructor(store: DataStore) {
    super(store, ['hp']);
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
    const [strValue] = this.store.getValueByPath([
      'object',
      'attribute',
      'str',
      'value',
    ]);
    return parseInt(strValue);
  }

  initDefaultValues() {
    this.setName('Hitpoints');
    this.setModificationValue(0);
    this.setValue(0);
    this.setCurrentValue(this.getValue());
  }
}
