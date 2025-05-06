import { AttributeManager } from '..';
import { DataStore } from '../../../../engine/models/store/store';
import { Attribute } from '../attribute';
import { Weight } from './weight';

export class Dodge extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['dodge']);
    this.attributeManager = attributeManager;
  }

  initDefaultValues() {
    this.setName('Dodge');
    this.setModificationValue(0);
    this.setValue(0);
  }

  getRawValue() {
    return (
      Math.floor(
        this.attributeManager.getByCode('speed')?.getValue() || 0
      ) + 3
    );
  }

  //TODO: add encumbrance
  // getValue(): number {
  //   const encumbrance = this.attributeManager
  //     .getByCode<Weight>('weight')
  //     .encumbrance();
  //   return Math.max(
  //     ...[this.getRawValue() - encumbrance + this.getModsValue(), 1]
  //   );
  // }
}
