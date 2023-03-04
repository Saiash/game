import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { SkillProps, SkillInputProps, CheckResults, ResolveResult } from './';
import { Attribute } from '../attributes/attribute';
import {
  ActionPayload,
  useSkillPayload,
} from '../../../engine/actionConnector';
import { SkillResolver } from './resolvers';
import { Lockpicking } from './resolvers/lockpicking';
import { CTX } from '../../../../types';

export class Skill {
  exp: number;
  attribute: Attribute;
  difficulty: string;
  name: string;
  code: string;
  description: string;
  resolver: SkillResolver;
  modificatorManager: ModificatorManager;
  ctx: CTX;

  constructor({ ctx, props }: { props: SkillProps; ctx: CTX }) {
    this.ctx = ctx;
    this.attribute = props.parentAttr;
    this.exp = props.exp;
    this.difficulty = props.difficulty;
    this.name = props.name;
    this.code = props.code;
    this.description = props.description;
    this.modificatorManager = new ModificatorManager();
    this.resolver = SKILLS_LIST[this.code]
      ? SKILLS_LIST[this.code]({ ctx, name: this.name, code: this.code })
      : new SkillResolver({ ctx, name: this.name, code: this.code });
  }

  check(difficulty: number): CheckResults {
    const value = this.getEffectiveValue();
    const rand = Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3;
    const result = rand <= value + difficulty;
    const checkResults = { rand, value, difficulty, result };
    this.getExp(checkResults);
    return checkResults;
  }

  getEffectiveValue(): number {
    return this.getRawValue() + this.getExpMod() + this.getModsValue();
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
    return 2 + (exp - 4) / 4;
  }

  getExp(checkResults: CheckResults) {
    const { rand, value, difficulty, result } = checkResults;
    const baseExpValue = 10;
    const difficulyExpMod = 1;
    const expirienceExpMod = 1;
    const successExpMod = result ? 1 : 0.1;
    const newExp =
      baseExpValue * difficulyExpMod * expirienceExpMod * successExpMod;
    this.exp += newExp / 100;
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

  getModsValue(): number {
    return this.modificatorManager.getValue();
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
      modificatorManager: new ModificatorManager(),
    };
  }

  async resolve(input: ActionPayload): Promise<ResolveResult> {
    const { sourceActor, payload, target } = input;
    if (payload.type !== 'useSkill') return { executed: false, payload: input };
    const { skill, difficulty, timeMod, options } = payload;
    if (!sourceActor) return { executed: false, payload: input };
    const optionsMod = this.calcOptionsMod(options);
    const skillCheckResult = this.check(difficulty + timeMod * 1 + optionsMod);
    this.resolver.commonResolve({
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

  showValue() {
    let text;
    const skillValue = Math.floor(this.getEffectiveValue());
    switch (skillValue) {
      case -12:
      case -11:
      case -10:
      case -9:
      case -8:
      case -7:
      case -6:
      case -5:
      case -4:
      case -3:
      case -2:
      case -1:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        break;

      default:
        break;
    }
    return text;
  }
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
