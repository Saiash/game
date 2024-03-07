import { Character } from '../..';
import { CTX } from '../../../../../types';
import {
  calculateSwingVal,
  calculateThrustVal,
} from '../../../items/weapon/damage';
import { SecondaryAttribute } from '../attribute';

export type damageRoll = { dices: number; mod: number; raw: number };

export class Damage extends SecondaryAttribute {
  character: Character;
  thrust: damageRoll;
  swing: damageRoll;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
    this.character = character;
    this.name = 'Damage';
    this.thrust = this.calculateThrustVal(this.getStr());
    this.swing = this.calculateSwingVal(this.getStr());
  }

  private getStr() {
    return this.character.attributeManager.getByCode('str').getValue();
  }

  calculateThrustVal(maxStr: number): damageRoll {
    const charStr = this.getStr();
    return calculateThrustVal(charStr, maxStr, this.getModsValue());
  }

  calculateSwingVal(maxStr: number): damageRoll {
    const charStr = this.getStr();
    return calculateSwingVal(charStr, maxStr, this.getModsValue());
  }
}
