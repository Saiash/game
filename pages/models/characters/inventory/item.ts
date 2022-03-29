import { TagSystem } from '../../';
import type { CTX } from '../../../types/';

export const itemZones = [
  { zones: 1, key: 'neck' },
  { zones: 2, key: 'left hand' },
  { zones: 3, key: 'right hand' },
];

export type ItemProps = {
  name: string;
  description: string;
  img: string;
  weight: number;

  zones: number[];
  tags: TagSystem;

  cost: number;
  mods: any;
};

export class Item {
  props: ItemProps;

  constructor(props: ItemProps) {
    const tags = props.tags as any as string;
    const tagSystem = new TagSystem(tags);
    this.props = props;
    this.props.tags = tagSystem;
  }

  getRaw() {
    return JSON.stringify(this);
  }

  static initFromRaw(raw: string): Item {
    const props = JSON.parse(raw);
    return new Item(props);
  }

  static async initByName(
    dataSource: CTX['dataSource'],
    name: string
  ): Promise<Item> {
    const { dataloaders } = dataSource;
    const itemData = await dataloaders.getItem(name);
    return new Item(itemData);
  }
}
