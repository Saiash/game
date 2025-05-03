import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Strength extends Attribute {
  constructor(store: DataStore) {
    super(store, ['str']);
  }

  initDefaultValues() {
    this.setName('Strength');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
