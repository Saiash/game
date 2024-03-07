import _, { random } from 'lodash';
import { ModificatorManager } from '../../managers/ModificatorManager';
import {
  SkillProps,
  SkillInputProps,
  CheckResults,
  ResolveResult,
  SkillManager,
} from './skillManager';
import { Attribute } from '../characters/attributes/attribute';
import { ActionPayload, useSkillPayload } from '../../engine/actionConnector';
import { SkillResolver } from '../skills/resolvers';
import { CTX, PartialRecord } from '../../../types';
import { ACTION_PAYLOAD_TYPE } from '../../engine/constants';
import { skillList } from '.';

export class Skill {
  protected exp: number;
  resolver: SkillResolver;
  modificatorManager: ModificatorManager;
  skillManager: SkillManager;
  private ctx: CTX;

  private attribute: Attribute;
  protected difficulty: string;
  private name: string;
  private code: string;
  private description: string;
  private cultureBased: boolean;
  private defaultSkillTime: number;
  private relativeSkills: PartialRecord<skillList, number>;

  constructor({ ctx, props }: { props: SkillProps; ctx: CTX }) {
    this.ctx = ctx;
    this.attribute = props.parentAttr;
    this.exp = props.exp;
    this.difficulty = props.difficulty;
    this.name = props.name;
    this.code = props.code;
    this.description = props.description;
    this.cultureBased = props.cultureBased || false;
    this.relativeSkills = props.relativeSkills || {};
    this.skillManager = props.skillManager;
    this.defaultSkillTime = props.defaultSkillTime || 60;
    this.modificatorManager = new ModificatorManager();
    this.resolver =
      props.resolver ||
      new SkillResolver({ ctx, name: this.name, code: this.code });
  }

  check(difficulty: number): CheckResults {
    const value = this.getEffectiveValue(); // эффективный навык
    const rand = Math.round(random(1, 6) + random(1, 6) + random(1, 6)); // бросок кубика
    const result = rand <= value + difficulty; //кубик сравнивается против навыка + сложности.
    const successMargin = rand - (value + difficulty);
    const checkResults = { rand, value, difficulty, result, successMargin };
    this.getExp(checkResults);
    return checkResults;
  }

  getEffectiveValue(): number {
    return (
      this.getRawValue() +
      this.getExpMod() +
      this.getModsValue() +
      this.getSpecificValue()
    );
  }

  getSpecificValue(): number {
    return 0;
  }

  getBaseRawValue(): number {
    const attrValue = this.attribute.getValue();
    return attrValue > 20 ? 20 : attrValue - this.diffMod().value;
  }

  getRawValue(): number {
    const relativeSkillsList = Object.keys(this.relativeSkills) as skillList[];
    const thisExp = this.getExpMod();
    const relativeSkillValue = relativeSkillsList.reduce((value, skillCode) => {
      const skillExp = this.skillManager.getByCode(skillCode)?.getExpMod() || 0;
      const newValue =
        skillExp > thisExp
          ? this.skillManager.getByCode(skillCode).getBaseRawValue() ||
            0 - (this.relativeSkills[skillCode] || 0)
          : 0;
      return newValue > value ? newValue : value;
    }, 0);
    const _attrValue = this.attribute.getValue();
    const attrValue = _attrValue > 20 ? 20 : _attrValue;
    const baseValue =
      attrValue > relativeSkillValue ? attrValue : relativeSkillValue;

    return baseValue - this.diffMod().value;
  }

  getDefaultSkillTime() {
    return this.defaultSkillTime;
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
    };
  }

  async resolve(input: ActionPayload): Promise<ResolveResult> {
    const { payload, target } = input;
    const sourceActor = input.sourceActor || this.skillManager.character;
    if (payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL)
      return { executed: false, payload: input };
    const { skill, difficulty, timeMod, options } = payload;
    const optionsMod = this.calcOptionsMod(options);

    let diffMod = 0;
    if (this.isCultureBased()) {
      const target = input.target?.getCultures();
      const sourceCulture = input.sourceActor?.getCultures();
      //сравнить между собой культуры источника и локации (если цели нет или цель локация/объект) или персонажа (если есть персонаж-цель)
      if (!!_.intersection(target, sourceCulture).length) {
        diffMod = 3;
      }
    }

    const skillCheckResult = this.check(
      difficulty + diffMod + timeMod * 1 + optionsMod
    );
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

  showValue(): string {
    let text = 'Забытые / редко используемые';
    const skillValue = Math.floor(this.getEffectiveValue());
    switch (skillValue) {
      case 10:
      case 11:
      case 12:
      case 13:
        text = 'Обычный навык';
        break;

      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        text = 'Эксперт';
        break;

      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        text = 'Мастер';
        break;

      default:
        break;
    }
    return text;
  }

  isCultureBased() {
    return this.cultureBased;
  }
}
