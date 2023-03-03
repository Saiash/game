import { testConditionData } from '.';
import { Character } from '../../../../characters';

export function testLastAction({
  ctx,
  conditionValue,
}: testConditionData): boolean {
  const lastAction = ctx.gameData.sceneEngine.getLastAction() + '';
  return conditionValue.some(value => value === lastAction);
}
