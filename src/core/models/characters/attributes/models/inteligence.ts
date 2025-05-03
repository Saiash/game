import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Inteligence extends Attribute {
  constructor(store: DataStore) {
    super(store, ['int']);
  }

  initDefaultValues() {
    this.setName('Inteligence');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
