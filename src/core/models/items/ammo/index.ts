import { CTX } from '../../../../types';
import { Item, ItemProps } from '../item';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';
import { baseDamageSet } from '../weapon/baseManager';

export type ammoProps = ItemProps;

const defaultMaterial = 'steel';

export class Ammo extends Item {
  constructor({
    ctx,
    props,
    materialCode,
    modification = [],
  }: {
    ctx: CTX;
    props: ammoProps;
    materialCode?: materialsList;
    modification?: modificationsList[];
  }) {
    super({
      ctx,
      props,
      type: 'ammo',
      modification,
      materialCode: materialCode || defaultMaterial,
    });
  }
}
