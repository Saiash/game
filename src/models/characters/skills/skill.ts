import { ModificatorManager } from '../../Modificator';
import { SkillProps, SkillInputProps, CheckResults, ResolveResult } from './';
import { attribute } from '../../index';
import { Character } from '..';
import { Item } from '../inventory/item';
import { ActionPayload, useSkillPayload } from '../../actionConnector';
import { SkillResolver } from './resolvers';
import { Lockpicking } from './resolvers/lockpicking';
import { CTX } from '../../../types';
import { result } from 'lodash';

export class Skill {
  exp: number;
  attribute: attribute.Attribute;
  difficulty: string;
  name: string;
  code: string;
  description: string;
  resolver: SkillResolver;
  ctx: CTX;

  constructor({ ctx, props }: { props: SkillProps; ctx: CTX }) {
    this.ctx = ctx;
    this.attribute = props.parentAttr;
    this.exp = props.exp;
    this.difficulty = props.difficulty;
    this.name = props.name;
    this.code = props.code;
    this.description = props.description;
    this.resolver = SKILLS_LIST[this.code]
      ? SKILLS_LIST[this.code]({ ctx, name: this.name, code: this.code })
      : new SkillResolver({ ctx, name: this.name, code: this.code });
  }

  check(difficulty: number): CheckResults {
    const value = this.getEffectiveValue();
    const rand = Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3;
    const result = rand <= value + difficulty;
    return { rand, value, difficulty, result };
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

  resolve(input: ActionPayload): ResolveResult {
    const { sourceActor, payload, target } = input;
    if (payload.type !== 'useSkill') return { executed: false, payload: input };
    const { skill, difficulty, timeMod, options } = payload;
    if (!sourceActor) return { executed: false, payload: input };
    const optionsMod = this.calcOptionsMod(options);
    const skillCheckResult = this.check(difficulty + timeMod * 1 + optionsMod);
    this.resolver.resolve({
      result: skillCheckResult,
      sourceActor,
      target,
    });
    return {
      executed: true,
      payload: input,
      checkResult: skillCheckResult,
      message: `${this.name}: ${skillCheckResult.result}, ${skillCheckResult.value}`,
    };
  }

  calcOptionsMod(options: useSkillPayload['options']): number {
    let result = 0;
    if (options?.offHand) result -= 4;
    return result;
  }

  getRaw() {}

  initFromRaw() {}
}

const SKILLS_LIST: {
  [index: string]: (args: {
    code: string;
    name: string;
    ctx: CTX;
  }) => SkillResolver;
} = {
  lockpicking: args => new Lockpicking(args),
};
