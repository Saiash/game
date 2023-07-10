import { Character } from '../..';
import { CTX } from '../../../../../types';
import { SecondaryAttribute } from '../attribute';

type damageRoll = { dices: number; mod: number };

export class Damage extends SecondaryAttribute {
  thrust: damageRoll;
  swing: damageRoll;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
    this.name = 'Damage';
    this.thrust = this.calculateThrustVal(
      character.attributeManager.getByCode('str')?.getRawValue() || 0
    );
    this.swing = this.calculateSwingVal(
      character.attributeManager.getByCode('str')?.getRawValue() || 0
    );
  }

  calculateThrustVal(str: number): damageRoll {
    const strMod = Math.floor((str - 1) / 2) + this.getModsValue();
    const dices = strMod <= 5 ? 1 : Math.floor((strMod - 5) / 4) + 1;
    const mod = strMod <= 6 ? strMod - 6 : ((strMod - 5) % 4) - 1;
    return { dices, mod };
  }

  calculateSwingVal(str: number): damageRoll {
    const dices = Math.floor(str / 4) - 1 + this.getModsValue();
    const mod = str % 4 === 0 ? 2 : (str % 4) - 2;
    return { dices, mod };
  }
}
