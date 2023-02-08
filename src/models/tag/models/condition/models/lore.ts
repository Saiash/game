import { testConditionData } from '.';
import { Character } from '../../../../characters';

export function testLore({
  conditionType,
  conditionValue,
  actor,
}: testConditionData): boolean {
  if (!(actor instanceof Character)) return false;
  const names = conditionValue as string[];
  const lores = actor.lore.getLoreByNames(names);
  return conditionType === 'knownLore'
    ? lores.length === names.length
    : lores.length === 0;
}
