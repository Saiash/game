import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Dexterity extends Attribute {
  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['dex']);
  }

  initDefaultValues() {
    this.setName('Dexterity');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
