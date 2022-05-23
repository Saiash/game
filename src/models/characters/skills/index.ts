import { ModificatorManager } from '../../Modificator';
import { attributes, attribute, item } from '../../index';
import { Skill } from './skill';
import { characters } from '../../index';

import type { CTX } from '../../../types/';
import { Character } from '..';
import { Item } from '../inventory/item';
import { ActionPayload } from '../../actionConnector';

export type SkillInputProps = {
  name: string;
  description: string;
  code: string;
  parentAttrCode: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
  ModificatorManager: ModificatorManager;
};

export type SkillProps = SkillInputProps & {
  exp: number;
  parentAttr: attribute.Attribute;
};

export type InputSkillsProps = {
  attributes: attributes.Attributes;
  skills?: InputSkillProps[];
};

export type InputSkillProps = {
  skillProps: SkillInputProps;
  exp?: number;
};

export type CheckResults = {
  rand: number;
  value: number;
  result: boolean;
  difficulty: number;
};

export class Skills {
  collection: { [index: string]: Skill };
  character: characters.Character;
  ctx: CTX;

  constructor({
    ctx,
    character,
    input,
  }: {
    ctx: CTX;
    character: characters.Character;
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

  resolve(input: ActionPayload): boolean {
    return this.collection[input.payload.skill].resolve(input);
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

    let parentAttr: attribute.Attribute =
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
}
