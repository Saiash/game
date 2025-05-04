import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Health extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['ht']);
    this.attributeManager = attributeManager;
  }

  initDefaultValues() {
    this.setName('Health');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
