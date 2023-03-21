import { Condition, conditionValue } from '..';
import { TagSystem } from '../../..';
import { CTX } from '../../../../../../types';
import { Character } from '../../../../../models/characters';
import { Item } from '../../../../../models/characters/inventory/item';
import { Location } from '../../../../../models/locations';
import { ObjectModel } from '../../../../../models/locations/object';
import { testLastAction } from './lastAction';
import { testLore } from './lore';
import { testStatus } from './status';

export type testConditionData = {
  condition: Condition;
  conditionType: string;
  conditionValue: conditionValue;
  actor: TagSystem['owner'];
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
};
