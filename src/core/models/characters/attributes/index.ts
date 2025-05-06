import { Attribute } from './attribute';
import { Dexterity } from './models/dexterity';
import { Fatigue } from './models/fatigue';
import { Health } from './models/health';
import { Hitpoints } from './models/hitpoints';
import { Inteligence } from './models/inteligence';
import { Move } from './models/move';
import { Perception } from './models/perception';
import { Speed } from './models/speed';
import { Strength } from './models/strength';
import { Will } from './models/will';
import { AttributesModel } from '../../../engine/models/entity/models/attributes';
import { characterAttrsCodesList } from '../../../engine/models/store/types';
import { Weight } from './models/weight';
import { Damage } from './models/damage';
import { Dodge } from './models/dodge';
import { Reaction } from './models/reaction';
import { Size } from './models/size';
import { DataStore } from '../../../engine/models/store/store';

export const ATTRS_LIST = [
  { code: 'str', model: Strength },
  { code: 'dex', model: Dexterity },
  { code: 'ht', model: Health },
  { code: 'int', model: Inteligence },
  { code: 'hp', model: Hitpoints },
  { code: 'per', model: Perception },
  { code: 'will', model: Will },
  { code: 'speed', model: Speed },
  { code: 'move', model: Move },
  { code: 'ft', model: Fatigue },
];

export const SECONDARY_ATTRS_LIST = [
  { code: 'weight', model: Weight },
  { code: 'dmg', model: Damage },
  { code: 'dodge', model: Dodge },
  { code: 'size', model: Size },
  { code: 'reaction', model: Reaction },
];

export class AttributeManager extends AttributesModel {
  private collection = new Map<characterAttrsCodesList, Attribute>();

  constructor(store: DataStore) {
    super(store);

    ATTRS_LIST.forEach(attr => {
      const newModel = new attr.model(store, this);
      this.collection.set(attr.code as characterAttrsCodesList, newModel);
    });
    SECONDARY_ATTRS_LIST.forEach(attr => {
      const newModel = new attr.model(store, this);
      this.collection.set(attr.code as characterAttrsCodesList, newModel);
    });
  }

  getByCode<T = Attribute>(code: characterAttrsCodesList): T {
    const attr = this.collection.get(code);
    if (!attr) throw new Error(`not propper attribute key ${code}`);
    return attr as unknown as T;
  }
}
