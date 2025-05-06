import { AttributeManager } from '..';
import { DataStore } from '../../../../engine/models/store/store';
import { Attribute } from '../attribute';

export class Size extends Attribute {
  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['size']);
  }

  initDefaultValues() {
    this.setName('Size');
    this.setModificationValue(0);
    this.setValue(0);
  }
}
