import { testConditionData } from '.';

export function testLastAction({
  ctx,
  conditionValue,
}: testConditionData): boolean {
  const lastAction = ctx.gameData.sceneEngine.getLastAction() + '';
  return conditionValue.some(value => value === lastAction);
}
