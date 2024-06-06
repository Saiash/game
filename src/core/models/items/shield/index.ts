import { CTX } from '../../../../types';
import { Item, ItemProps } from '../item';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';

export type shieldProps = ItemProps & {
  defenceBonus: number;
  coverDr: number;
};

const defaultMaterial = 'wood';

export class Shield extends Item {
  defenceBonus: number;
  coverDr: number;

  constructor({
    ctx,
    props,
    materialCode,
    modification = [],
  }: {
    ctx: CTX;
    props: shieldProps;
    materialCode?: materialsList;
    modification?: modificationsList[];
  }) {
    super({
      ctx,
      props,
      type: 'weapon',
      modification,
      materialCode: materialCode || defaultMaterial,
    });
    const { defenceBonus, coverDr } = props;
    this.defenceBonus = defenceBonus;
    this.coverDr = coverDr;
  }
}
