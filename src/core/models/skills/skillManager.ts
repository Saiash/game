import { Skill } from './skill';
import { Character } from '../characters/index';
import { ActionPayload } from '../../engine/actionConnector';
import { ACTION_PAYLOAD_TYPE } from '../../engine/constants';
import { SKILL_LIST, skillList } from '.';
import {
  CheckResults,
  commonResolvers,
  InputSkillsProps,
  ResolveResult,
} from './types';
import type { CTX } from '../../../types';

export class SkillManager {
  collection: { [index: string]: Skill };
  character: Character;
  ctx: CTX;

  constructor({
    ctx,
    character,
    input,
  }: {
    ctx: CTX;
    character: Character;
    input?: InputSkillsProps;
  }) {
    this.ctx = ctx;
    this.collection = {};
    this.character = character;
  }

  check({
    code,
    difficulty,
    timeMod,
  }: {
    code: string;
    difficulty: number;
    timeMod: number;
  }): CheckResults {
    const skill = this.collection[code];
    return skill.check(difficulty + timeMod);
  }

  async resolve(input: ActionPayload): Promise<boolean> {
    let result: ResolveResult = { executed: false };
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL) return false;
    const skillName = input.payload.skill;

    if (this.isCommonAction(skillName)) {
      const resolver = new commonResolvers[skillName]({
        ctx: this.ctx,
        code: skillName,
        name: skillName,
      });
      result = await resolver.resolve(input);
    } else {
      result = await this.collection[skillName].resolve(input);
    }
    if (result.message) {
      this.ctx.gameData.log.addEvent({
        source: result.payload?.sourceActor,
        text: result.message,
      });
    }
    return result.executed || result.checkResult?.result || false;
  }

  async add({
    name,
    exp = 0,
  }: {
    name: skillList;
    exp?: number;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    this.collection[name] = SKILL_LIST[name]({
      ctx: this.ctx,
      character: this.character,
      skillManager: this,
      exp,
    });
    return true;
  }

  getAsArray(): [string, Skill][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode<T = Skill>(code: skillList): T {
    return this.collection[code] as unknown as T;
  }

  isCommonAction(skillName: string): boolean {
    return Object.keys(commonResolvers).some(s => s === skillName);
  }
}
