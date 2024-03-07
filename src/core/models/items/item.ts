import { TagSystem } from '../../managers/tag';
import type { CTX } from '../../../types/';
import { Character } from '../characters';
import { ITEMS_LIST, itemsList } from './fabric';

export const itemZones = [
  { zones: 1000, key: 'head' },
  { zones: 1010, key: 'skull' },
  { zones: 1020, key: 'left eye' },
  { zones: 1120, key: 'right eye' },
  { zones: 1220, key: 'eyes' },
  { zones: 1030, key: 'nose' },
  { zones: 1040, key: 'mouth' },
  { zones: 1050, key: 'neck' },
  //уши
  //язык

  { zones: 2000, key: 'body' },
  { zones: 2010, key: 'chest' },
  { zones: 2020, key: 'belly' },
  { zones: 2030, key: 'belt' },
  { zones: 2040, key: 'pelvis' },
  //зоны?
  { zones: 2050, key: 'back' },

  { zones: 3000, key: 'leftHand' },
  { zones: 3100, key: 'rightHand' },
  { zones: 3200, key: 'bothHands' },
  { zones: 3010, key: 'upperShoulder' },
  { zones: 3020, key: 'shoulder' },
  { zones: 3030, key: 'forearm' },
  { zones: 3040, key: 'wrist' },
  { zones: 3050, key: 'hand' },
  { zones: 3060, key: 'finger' },

  { zones: 4000, key: 'leftLeg' },
  { zones: 4100, key: 'rightLeg' },
  { zones: 4200, key: 'bothLegs' },
  { zones: 4010, key: 'thigh' },
  { zones: 4020, key: 'knee' },
  { zones: 4030, key: 'shin' },
  { zones: 4040, key: 'foot' },
  { zones: 4050, key: 'toe' },

  { zones: 5000, key: 'leftHandItem' },
  { zones: 5100, key: 'rightHandItem' },

  //слоты быстрого использования: с пояса, рюкзака, разгрузки, карманов
];
//TODO: доопределить все зоны. Возможно их следует организовать немного более удобно.
// Подумать над базовыми формами предметов и цепочкой наследования: каждый предмет наследует и переписывает родителя. Либо категории предметов для условий

let itemId = 0;
export type rawItem = ItemProps;

export type ItemProps = {
  name: string;
  description: string;
  img: string;
  weight: number;
  legalityClass?: number;
  techLevel: number;

  zones: number[];
  tags?: TagSystem;

  cost: number;
  mods?: any;
  options?: string[];
  code: itemsList;
  //Todo: мутабельность предметов. Должен быть отдельный стейт; определяющий, в каком состоянии предмет находится. И логика переключения стейтов + список возможных стейтов.
};

export class Item {
  id: number;
  props: ItemProps;
  tags: TagSystem;
  locked: boolean = false;
  lockable: boolean = false;
  owner?: Character;
  legalityClass: number;
  techLevel: number;
  code: itemsList;
  status: string[];
  ctx: CTX;

  constructor({ ctx, props }: { ctx: CTX; props: ItemProps }) {
    this.ctx = ctx;
    this.id = itemId++;
    const tags = props.tags as any as string;
    this.props = props;
    this.legalityClass = props.legalityClass || 4;
    this.code = props.code;
    this.techLevel = props.techLevel || 0;
    if (props.options?.some(o => o === 'lockable')) {
      this.lockable = true;
    }
    this.props.zones = this.calculateZones(props.zones);
    const tagSystem = new TagSystem({
      ctx,
      input: { props: tags, target: this },
      owner: this,
    });
    this.tags = tagSystem;
    this.status = [];
  }

  getId(): number {
    return this.id;
  }

  setOwner(character: Character | undefined) {
    this.owner = character;
  }

  getName(): string {
    return this.props.name;
  }

  getRaw() {
    return JSON.stringify(this);
  }

  static initFromRaw(raw: string): Item {
    const props = JSON.parse(raw);
    return new Item(props);
  }

  static async initByName({
    ctx,
    dataloaders,
    name,
  }: {
    ctx: CTX;
    dataloaders: CTX['dataloaders'];
    name: string;
  }): Promise<Item> {
    const itemData = await dataloaders.getItem(name);
    return new Item({ ctx, props: itemData });
  }

  calculateZones(zones: number[]): number[] {
    const result: number[] = [];
    zones.forEach(zone => {
      result.push(zone);
      if ((zone + '')[1] === '2') {
        result.push(zone - 100);
        result.push(zone - 200);
      }
    });
    return result;
  }

  getMainSlot(): number {
    return this.props.zones[0];
  }

  lock() {
    this.locked = true;
    this.tags.conditionChanged('locked');
    return true;
  }

  unlock() {
    this.locked = false;
    this.tags.conditionChanged('locked');
    return true;
  }

  isLockable() {
    return this.lockable && !this.locked;
  }

  isLocked() {
    return this.locked;
  }

  hasStatus(status: string): boolean {
    return this.status.some(s => {
      return s === status;
    });
  }

  addStatus(status: string): boolean {
    if (this.hasStatus(status)) return false;
    this.status.push(status);
    return true;
  }

  removeStatus(status: string): boolean {
    this.status = this.status.filter(s => s !== status);
    this.tags.conditionChanged(status);
    return true;
  }

  getCultures(): string[] {
    return [];
  }

  //У предмета могут быть морфы(?) - возможность превращаться в другие предметы. Морфы должны быть строго совместимы.
}
