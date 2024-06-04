//TODO:  Итоговая броня = это материал + схема, например бронза + нагрудник
//TODO:  Материал - например укрепленная кожа
//TODO:  схема - тяжелая / слоеная
//TODO:  дизайн - нагрудник (грудь + пах, но не спина)

import { CTX } from '../../../../types';
import { Item, ItemProps } from '../item';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';

export type armorProps = ItemProps & {
  armorType: 'rigit' | 'flexible';
  DR: number;
  donningTime: number;
};

const defaultMaterial = 'steel';

export class Armor extends Item {
  armorType: 'rigit' | 'flexible';
  DR: number;
  donningTime: number;

  constructor({
    ctx,
    props,
    materialCode,
    modification = [],
  }: {
    ctx: CTX;
    props: armorProps;
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
    const { armorType, DR, donningTime } = props;
    this.armorType = armorType;
    this.DR = DR;
    this.donningTime = donningTime;
  }

  getDonningTime(): number {
    return this.donningTime; //TODO: время фактически зависит от занимаемыхс слотов; нужно считать сумму по таблице покрытия
  }

  getDR(): number {
    return this.DR;
  }

  getArmorType(): armorProps['armorType'] {
    return this.armorType;
  }
}
