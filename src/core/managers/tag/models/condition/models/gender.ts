import { testConditionData } from '.';
import { Character } from '../../../../../models/characters';

export function testGender({
  ctx,
  condition,
  conditionType,
  conditionValue,
  actor,
  owner,
}: testConditionData): boolean {
  if (!(actor instanceof Character)) return false;
  if (!(owner instanceof Character)) return false;
  const [value] = conditionValue;
  if (['female', 'male'].some(v => v === value)) {
    return actor.getGender() === value;
  } else {
    if (value === 'opposite') {
      return actor.getGender() !== owner.getGender();
    }
    return actor.getGender() === owner.getGender();
  }
}
