import { AttributeManager } from '..';
import { DataStore } from '../../../../engine/models/store/store';
import { Attribute } from '../attribute';

export class Reaction extends Attribute {
  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['reaction']);
  }

  initDefaultValues() {
    this.setName('reaction');
    this.setModificationValue(0);
    this.setValue(0);
  }
}