import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';
import { AttributeManager } from '..';

export class Inteligence extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['int']);
    this.attributeManager = attributeManager;
  }

  initDefaultValues() {
    this.setName('Inteligence');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
