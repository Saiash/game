import { skillList } from '.';
import { PartialRecord } from '../../../types';
import { ActionPayload } from '../../engine/actionConnector';
import { AttributeManager, attrsCodesList } from '../characters/attributes';
import { Attribute } from '../characters/attributes/attribute';
import { SkillResolver } from './resolvers';
import { CommonActionResolver } from './resolvers/commonAction';
import { LookResolver } from './resolvers/look';
import { SkillManager } from './skillManager';

export type rawSkill = SkillInputProps;

export type SkillInputProps = {
  name: string;
  description: string;
  code: string;
  parentAttrCode: attrsCodesList;
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
  rand: number;
  value: number;
  result: boolean;
  difficulty: number;
  successMargin: number;
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
