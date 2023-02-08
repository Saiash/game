import { testConditionData } from '.';

export function testStatus({
  condition,
  conditionType,
  conditionValue,
  actor,
}: testConditionData): boolean {
  const result = conditionValue.map(value => {
    condition.addExistingCondition(value as string);
    if (value === 'locked') {
      return actor.isLocked();
    } else {
      return actor.hasStatus(value as string);
    }
  });
  return conditionType !== 'notStatus'
    ? result.every(r => r === true)
    : result.every(r => r === false);
}
