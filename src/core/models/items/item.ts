import { TagSystem } from '../../managers/tag';
import type { CTX } from '../../../types/';
import { Character } from '../characters';
import { itemsList } from './fabric';
import { equipZones } from './doll/types';

export type ItemId = number;
export type rawItem = ItemProps;
let itemId: ItemId = 0;

export type ItemProps = {
  name: string;
  description: string;
  img: string;
  weight: number;
  legalityClass?: number;
  techLevel: number;

  zones: equipZones[][];
  tags?: TagSystem;

  cost: number;
  mods?: any;
  options?: string[];
  code: itemsList;
  //Todo: мутабельность предметов. Должен быть отдельный стейт; определяющий, в каком состоянии предмет находится. И логика переключения стейтов + список возможных стейтов.
};

export class Item {
  id: ItemId;
  zones: equipZones[][];
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
    this.zones = props.zones;
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

  getZones() {
    return this.zones;
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
