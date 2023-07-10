import { Condition, conditionValue } from '..';
import { TagSystem } from '../../..';
import { CTX } from '../../../../../../types';
import { testLastAction } from './lastAction';
import { testGender } from './gender';
import { testLore } from './lore';
import { testStatus } from './status';

export type testConditionData = {
  condition: Condition;
  conditionType: string;
  conditionValue: conditionValue;
  actor: TagSystem['owner'];
  owner: TagSystem['owner'];
  ctx: CTX;
};

export const conditionTestsVariants: {
  [index: string]: (data: testConditionData) => boolean;
} = {
  unknownLore: testLore,
  knownLore: testLore,
  status: testStatus,
  notStatus: testStatus,
  lastAction: testLastAction,
  gender: testGender,
};
