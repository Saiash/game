import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Strength extends Attribute {
  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['str']);
  }

  initDefaultValues() {
    this.setName('Strength');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
