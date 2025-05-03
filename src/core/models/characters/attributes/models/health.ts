import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Health extends Attribute {
  constructor(store: DataStore) {
    super(store, ['ht']);
  }

  initDefaultValues() {
    this.setName('Health');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
