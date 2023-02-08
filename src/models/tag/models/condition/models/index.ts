import { Condition, conditionValue } from '..';
import { CTX } from '../../../../../types';
import { Character } from '../../../../characters';
import { Item } from '../../../../characters/inventory/item';
import { Location } from '../../../../locations';
import { ObjectModel } from '../../../../locations/object';
import { testLastAction } from './lastAction';
import { testLore } from './lore';
import { testStatus } from './status';

export type testConditionData = {
  condition: Condition;
  conditionType: string;
  conditionValue: conditionValue;
  actor: Character | Item | ObjectModel | Location;
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
