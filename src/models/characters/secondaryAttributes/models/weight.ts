import { Character } from '../..';
import { CTX } from '../../../../types';
import { ModificatorManager } from '../../../Modificator';
import { Strength } from '../../attributes/models/strength';
import { ResolveResult } from '../../skills';
import { SecondaryAttribute } from '../attribute';

export class Weight extends SecondaryAttribute {
  strength: Strength;
  maxVal: number;
  currentVal: number;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
    this.name = 'Weight';
    this.currentVal = 0;
    this.strength = character.attributes.getByCode('str');
    this.maxVal = this.calculateMaxVal();
  }

  calculateMaxVal(): number {
    return Math.pow(this.strength.getRawValue(), 2);
  }

  upliftWeight(weight: number): ResolveResult {
    if (weight > this.basicWeight() * 8 - this.currentVal)
      return {
        executed: true,
        checkResult: { result: false },
        message: 'Слишком тяжело!',
      };
    this.ctx.gameData.timeManager.calcTimeSpent(
      Math.floor(weight / this.basicWeight())
    );
    return {
      executed: true,
      checkResult: { result: false },
      message: `Успешно!`,
    };
  }

  basicWeight(): number {
    return this.strength.getRawValue() / 5;
  }

  encumbrance(): number {
    let level = Math.floor(this.currentVal / this.basicWeight());
    if (level >= 4 && level <= 6) {
      level = 3;
    } else {
      level = 4;
    }
    return level;
  }
}
