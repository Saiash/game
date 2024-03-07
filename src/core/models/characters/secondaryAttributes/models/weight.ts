import { Character } from '../..';
import { CTX } from '../../../../../types';
import { BASE_TIME_PER_ACTION } from '../../../../engine/constants';
import { Strength } from '../../attributes/models/strength';
import { ResolveResult } from '../../../skills/skillManager';
import { SecondaryAttribute } from '../attribute';

export class Weight extends SecondaryAttribute {
  strength: Strength;
  maxVal: number;
  currentVal: number;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
    this.name = 'Weight';
    this.currentVal = 0;
    this.strength = character.attributeManager.getByCode('str') as Strength;
    this.maxVal = this.calculateMaxVal();
  }

  calculateMaxVal(): number {
    return Math.pow(this.strength.getValue(), 2) + this.getModsValue();
  }

  upliftWeight(weight: number): ResolveResult {
    if (weight > this.basicWeight() * 8 - this.currentVal)
      return {
        executed: true,
        checkResult: {
          result: false,
          rand: 0,
          value: 0,
          difficulty: 0,
          successMargin: 0,
        },
        message: 'Слишком тяжело!',
      };
    this.ctx.gameData.timeManager.calcTimeSpent(
      Math.floor(weight / this.basicWeight())
    );
    return {
      executed: true,
      checkResult: {
        result: true,
        rand: 0,
        value: 0,
        difficulty: 0,
        successMargin: 0,
      },
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
