import { attributes, attribute } from '../../index';
import { Skill } from './skill';

export type SkillInputProps = {
  name: string;
  description: string;
  code: string;
  parentAttrCode: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
};

export type SkillProps = {
  name: string;
  description: string;
  code: string;
  exp: number;
  parentAttr: attribute.Attribute;
  parentAttrCode: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
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
};

export class Skills {
  collection: { [index: string]: Skill };

  constructor(input?: InputSkillsProps) {
    this.collection = {};
    if (input) this.addSkills(input);
  }

  check(key: string, difficulty: number): CheckResults {
    return this.collection[key].check(difficulty);
  }

  addSkill({
    skillInputProps,
    attributes,
    exp,
  }: {
    skillInputProps: InputSkillProps;
    attributes: attributes.Attributes;
    exp?: number;
  }) {
    let parentAttr: attribute.Attribute =
      attributes.collection[skillInputProps.skillProps.parentAttrCode];
    const skillProps = {
      ...skillInputProps.skillProps,
      parentAttr,
      ...(exp ? { exp } : { exp: 0 }),
    };
    const skill = new Skill(skillProps);
    this.collection[skill.props.code] = skill;
  }

  addSkills({ attributes, skills }: InputSkillsProps) {
    if (!skills) return;
    for (const skill of skills) {
      this.addSkill({ skillInputProps: skill, exp: skill.exp, attributes });
    }
  }
}
