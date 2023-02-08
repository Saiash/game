import { testConditionData } from '.';
import { Character } from '../../../../characters';

export function testLastAction({
  ctx,
  conditionValue,
}: testConditionData): boolean {
  //последнее действие всегда одно
  const [value] = conditionValue;
  return ctx.gameData.sceneEngine.getLastAction() + '' === value;
}
