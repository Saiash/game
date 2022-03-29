import { SkillProps, SkillInputProps, CheckResults } from './';

export class Skill {
  props: SkillProps;

  constructor(props: SkillProps) {
    this.props = props;
  }

  check(difficulty: number): CheckResults {
    const value = this.getEffectiveValue();
    const rand = Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3;
    const result = rand <= value - difficulty;
    return { rand, value, result };
  }

  getEffectiveValue(): number {
    const expMod = this.calculateExpMod();
    return this.props.parentAttr.getValue() + expMod - this.diffMod().value;
  }

  calculateExpMod(): number {
    const exp = this.props.exp;
    if (exp <= 0) return -4;
    if (exp >= 1 && exp < 2) return 0;
    if (exp >= 2 && exp < 3) return 1;
    if (exp >= 3 && exp < 4) return 1.5;
    return 3 + (exp - 4) / 4;
  }

  diffMod(): { difficulty: string; value: number } {
    let value = 0;
    switch (this.props.difficulty) {
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
    return { difficulty: this.props.difficulty, value };
  }

  static getDefaultProps(): SkillInputProps {
    return {
      name: 'Default',
      description: 'Default',
      code: 'def',
      parentAttrCode: 'dex',
      difficulty: 'easy',
    };
  }

  getRaw() {}

  initFromRaw() {}
}
