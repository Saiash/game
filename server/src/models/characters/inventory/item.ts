export const itemZones = [{ zones: 1, key: 'neck' }];

export type ItemProps = {
  name: string;
  description: string;
  img: string;
  weight: number;

  zones: number[];

  cost: number;
  mods: any;
};

export class Item {
  props: ItemProps;

  constructor(props: ItemProps) {
    this.props = props;
  }

  getRaw() {
    return JSON.stringify(this);
  }

  static initFromRaw(raw: string): Item {
    const props = JSON.parse(raw);
    return new Item(props);
  }
}
