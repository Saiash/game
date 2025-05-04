import { characterAttrsCodesList } from '../../engine/models/store/types';
import { Character } from '../../models/characters';
import { skillList } from '../../models/characters/skills';
import { throwDices } from '../../utils/diceThrower';
import { CheckResults } from './type';

export class ChecksManager {
  checkAttribute(
    character: Character,
    key: characterAttrsCodesList,
    difficulty: number
  ): CheckResults {
    return this.check(
      character.attributeManager.getByCode(key).getValue(),
      difficulty
    );
  }

  checkSkill(
    character: Character,
    key: skillList,
    difficulty: number
  ): CheckResults {
    return this.check(
      character.skillManager.getByCode(key).getValue(),
      difficulty
    );
  }


  // isCommonAction(skillName: string): boolean {
  //   return Object.keys(commonResolvers).some(s => s === skillName);
  // }

  // async resolveSkill(input: ActionPayload): Promise<boolean> {
  //   let result: ResolveResult = { executed: false };
  //   if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL) return false;
  //   const skillName = input.payload.skill;

  //   if (this.isCommonAction(skillName)) {
  //     const resolver = new commonResolvers[skillName]({
  //       ctx: this.ctx,
  //       code: skillName,
  //       name: skillName,
  //     });
  //     result = await resolver.resolve(input);
  //   } else {
  //     result = await this.collection[skillName].resolve(input);
  //   }
  //   if (result.message) {
  //     this.ctx.gameData.log.addEvent({
  //       source: result.payload?.sourceActor,
  //       text: result.message,
  //     });
  //   }
  //   return result.executed || result.checkResult?.result || false;
  // }

  // check(difficulty: number): CheckResults {
  //   const value = this.getEffectiveValue(); // эффективный навык
  //   const rand = Math.round(random(1, 6) + random(1, 6) + random(1, 6)); // бросок кубика
  //   const result = rand <= value + difficulty; //кубик сравнивается против навыка + сложности.
  //   const successMargin = value + difficulty - rand;
  //   const checkResults = { rand, value, difficulty, result, successMargin };
  //   this.getExp(checkResults);
  //   return checkResults;
  // }

  private check(value: number, difficulty: number = 0): CheckResults {
    const rand = throwDices(3, 6);
    const result = rand <= value + difficulty;
    const successMargin = rand - value + difficulty;
    return { rand, value, result, difficulty, successMargin };
  }
}
