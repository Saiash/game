import { ModificatorManager } from '../../Modificator';
import { SkillProps, SkillInputProps, CheckResults } from './';
import { attribute } from '../../index';

export class Skill {
  exp: number;
  attribute: attribute.Attribute;
  difficulty: string;

  constructor(props: SkillProps) {
    this.attribute = props.parentAttr;
    this.exp = props.exp;
    this.difficulty = props.difficulty;
  }

  check(difficulty: number): CheckResults {
    const value = this.getEffectiveValue();
    const rand = Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3;
    const result = rand <= value - difficulty;
    return { rand, value, result };
  }

  getEffectiveValue(): number {
    return this.getRawValue() + this.getExpMod();
  }

  getRawValue(): number {
    return this.attribute.getValue() - this.diffMod().value;
  }

  getExpMod(): number {
    const exp = this.exp;
    if (exp <= 0) return -4;
    if (exp >= 1 && exp < 2) return 0;
    if (exp >= 2 && exp < 3) return 1;
    if (exp >= 3 && exp < 4) return 1.5;
    return 3 + (exp - 4) / 4;
  }

  diffMod(): { difficulty: string; value: number } {
    let value = 0;
    switch (this.difficulty) {
      case 'easy':
        value = 0;
        break;

      case 'medium':
        value = 1;
        break;

      case 'hard':
        value = 2;
        break;

      case 'very hard':
        value = 3;
        break;
    }
    return { difficulty: this.difficulty, value };
  }

  setExp(exp: number) {
    this.exp = exp;
  }

  static getDefaultProps(): SkillInputProps {
    return {
      name: 'Default',
      description: 'Default',
      code: 'def',
      parentAttrCode: 'dex',
      difficulty: 'easy',
      ModificatorManager: new ModificatorManager(),
    };
  }

  getRaw() {}

  initFromRaw() {}
}
