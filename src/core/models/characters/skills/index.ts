import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { Attributes } from '../attributes';
import { Attribute } from '../attributes/attribute';
import { Skill } from './skill';
import { Character } from '../index';

import { ActionPayload } from '../../../engine/actionConnector';

import { LookResolver } from './resolvers/look';

import type { CTX } from '../../../../types/';
import type { SkillResolver } from './resolvers';
import { CommonActionResolver } from './resolvers/commonAction';

export type rawSkill = SkillInputProps;

export type SkillInputProps = {
  name: string;
  description: string;
  code: string;
  parentAttrCode: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
  modificatorManager: ModificatorManager;
};

export type SkillProps = SkillInputProps & {
  exp: number;
  parentAttr: Attribute;
};

export type InputSkillsProps = {
  attributes: Attributes;
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

export class Skills {
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
    return this.collection[code].check(difficulty + timeMod);
  }

  async resolve(input: ActionPayload): Promise<boolean> {
    let result: ResolveResult = { executed: false };
    if (input.payload.type !== 'useSkill') return false;
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
    name: string;
    exp?: number;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    const skillData = await dataloaders.getSkill(name);
    const { parentAttr: parentAttrCode } = skillData;

    let parentAttr: Attribute =
      this.character.attributes.getByCode(parentAttrCode);
    const skill = new Skill({
      ctx: this.ctx,
      props: { ...skillData, parentAttr, exp },
    });
    this.collection[name] = skill;
    return true;
  }

  getAsArray(): [string, Skill][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: string) {
    return this.collection[code];
  }

  isCommonAction(skillName: string): boolean {
    return Object.keys(commonResolvers).some(s => s === skillName);
  }
}