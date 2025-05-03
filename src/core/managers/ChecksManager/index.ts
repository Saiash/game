import { characterAttrsCodesList } from '../../engine/models/store/types';
import { Character } from '../../models/characters';
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

  private check(value: number, difficulty: number = 0): CheckResults {
    const rand = throwDices(3, 6);
    const result = rand <= value + difficulty;
    const successMargin = rand - value + difficulty;
    return { rand, value, result, difficulty, successMargin };
  }
}
