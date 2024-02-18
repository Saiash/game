import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { AttributeManager } from '../attributes';
import { Attribute } from '../attributes/attribute';
import { Skill } from './skill';
import { Character } from '../index';

import { ActionPayload } from '../../../engine/actionConnector';

import { LookResolver } from './resolvers/look';

import type { CTX, PartialRecord } from '../../../../types/';
import type { SkillResolver } from './resolvers';
import { CommonActionResolver } from './resolvers/commonAction';
import { ACTION_PAYLOAD_TYPE } from '../../../engine/constants';
import { SKILL_LIST, skillList } from '../../skills';

export type rawSkill = SkillInputProps;

export type SkillInputProps = {
  name: string;
  description: string;
  code: string;
  parentAttrCode: string;
  cultureBased?: boolean;
  defaultSkillTime?: number;
  resolver?: SkillResolver;
  relativeSkills?: PartialRecord<skillList, number>;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
};

export type SkillProps = SkillInputProps & {
  exp: number;
  parentAttr: Attribute;
  skillManager: SkillManager;
};

export type InputSkillsProps = {
  attributes: AttributeManager;
  skills?: InputSkillProps[];
};

export type InputSkillProps = {
  skillProps: SkillInputProps;
  exp?: number;
};

export type CheckResults = {
  rand?: number;
  value?: number;
  result: boolean;
  difficulty?: number;
};

export type ResolveResult = {
  executed: boolean;
  payload?: ActionPayload;
  checkResult?: CheckResults;
  message?: string;
};

export const commonResolvers: { [index: string]: typeof SkillResolver } = {
  open: CommonActionResolver,
  close: CommonActionResolver,
  look: LookResolver,
};

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
    dataloaders,
    name,
    exp = 0,
  }: {
    dataloaders: CTX['dataloaders'];
    name: skillList;
    exp?: number;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    this.collection[name] = SKILL_LIST[name]({
      ctx: this.ctx,
      character: this.character,
      skillManager: this,
    });
    return true;
  }

  getAsArray(): [string, Skill][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: string): Skill | undefined {
    return this.collection[code];
  }

  isCommonAction(skillName: string): boolean {
    return Object.keys(commonResolvers).some(s => s === skillName);
  }
}
