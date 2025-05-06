import { AttributeManager } from '..';
import { DataStore } from '../../../../engine/models/store/store';
import {
  calculateSwingVal,
  calculateThrustVal,
} from '../../../items/weapon/damage';
import { Attribute } from '../attribute';

export type damageRoll = { dices: number; mod: number; raw: number };

export class Damage extends Attribute {
  private attributeManager: AttributeManager;
  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['dmg']);
    this.attributeManager = attributeManager;
  }

  initDefaultValues() {
    this.setName('Damage');
    this.setModificationValue(0);
    this.setValue(0);
  }

  private getStr() {
    return this.attributeManager.getByCode('str').getValue();
  }

  calculateThrustVal(maxStr: number): damageRoll {
    const charStr = this.getStr();
    return calculateThrustVal(charStr, maxStr, this.getModsValue());
  }

  calculateSwingVal(maxStr: number): damageRoll {
    const charStr = this.getStr();
    return calculateSwingVal(charStr, maxStr, this.getModsValue());
  }
}
