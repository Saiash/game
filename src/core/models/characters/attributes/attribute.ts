import { CharacterAttributeModel } from '../../../engine/models/entity/models/characterAttribute';
import { DataStore } from '../../../engine/models/store/store';
import { attrsMapType } from '../../../engine/models/store/types';

export class Attribute extends CharacterAttributeModel {
  constructor(store: DataStore, path: attrsMapType[]) {
    super(store, path);
    if (!this._getUnsafeValue('value')) {
      this.initDefaultValues();
    }
  }

  getValue(): number {
    let value = super.getValue();
    return value + this.getModsValue();
  }

  getModsValue(): number {
    return this.getModificationValue();
    //return this.props.modificatorManager.getValue();?? ToDo? Значения, которые как-то прокидываются извне и могут влиять; например кольцо +1 силы
  }

  getRawValue(): number {
    return super.getValue();
  }

  initDefaultValues() {}

  getRaw() {}

  initFromRaw() {}

  showValue() {
    let text;
    const attrValue = this.getValue();
    switch (attrValue) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        break;

      default:
        break;
    }
    return text;
  }
}
