import { CTX } from '../../../../types';
import { SkillProps } from '../../characters/skills';
import { Skill } from '../../characters/skills/skill';

export class technique extends Skill {
  constructor({ ctx, props }: { props: SkillProps; ctx: CTX }) {
    super({ props, ctx });
  }

  getExpMod(): number {
    return this.difficulty === 'medium'
      ? Math.floor(this.exp)
      : Math.floor(this.exp) - 1;
  }

  getEffectiveValue(): number {
    const exp = this.getExpMod();
    return exp <= 0 ? 0 : exp;
  }
}
