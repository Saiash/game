import { TagSystem } from '../../';
import type { CTX } from '../../../types/';

export const itemZones = [
  { zones: 1000, key: 'head' },
  { zones: 1010, key: 'skull' },
  { zones: 1020, key: 'left eye' },
  { zones: 1120, key: 'right eye' },
  { zones: 1030, key: 'nose' },
  { zones: 1040, key: 'mouth' },
  { zones: 1050, key: 'neck' },

  { zones: 2000, key: 'body' },
  { zones: 2010, key: 'chest' },
  { zones: 2020, key: 'belly' },
  { zones: 2030, key: 'belt' },
  { zones: 2040, key: 'pelvis' },
  { zones: 2050, key: 'back' },

  { zones: 3000, key: 'leftHand' },
  { zones: 3100, key: 'rightHand' },
  { zones: 3010, key: 'upperShoulder' },
  { zones: 3020, key: 'shoulder' },
  { zones: 3030, key: 'forearm' },
  { zones: 3040, key: 'wrist' },
  { zones: 3050, key: 'hand' },
  { zones: 3060, key: 'finger' },

  { zones: 4000, key: 'leftLeg' },
  { zones: 4100, key: 'rightLeg' },
  { zones: 4010, key: 'thigh' },
  { zones: 4020, key: 'knee' },
  { zones: 4030, key: 'shin' },
  { zones: 4040, key: 'foot' },
  { zones: 4050, key: 'toe' },

  { zones: 5000, key: 'leftHandItem' },
  { zones: 5100, key: 'rightHandItem' },

  //слоты быстрого использования: с пояса, рюкзака, разгрузки, карманов
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
    dataloaders: CTX['dataloaders'],
    name: string
  ): Promise<Item> {
    const itemData = await dataloaders.getItem(name);
    return new Item(itemData);
  }
}
