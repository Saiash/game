import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { Attribute } from '../attribute';
import { DataStore } from '../../../../engine/models/store/store';

export class Dexterity extends Attribute {
  constructor(store: DataStore) {
    super(store, ['dex']);
  }

  initDefaultValues() {
    this.setName('Dexterity');
    this.setModificationValue(0);
    this.setValue(10);
  }
}
