import { ATTRS_LIST } from '../../../core/models/characters/attributes';
import { itemZones } from '../../../core/models/characters/inventory/item';

export const ATTRS_ENUM = ATTRS_LIST.map(a => a.code);

export const DIFF_ENUM = ['easy', 'medium', 'hard', 'very hard'];

export const STATUS_ENUM = ['closed', 'open', 'trapped', 'locked'];

export const NODE_TYPE = ['node', 'scene'];

export const ACTIONS_ENUM = ['open', 'close', 'look'];

export const EVENTS_ENUM = ['onSuccess', 'onFail'];

export const GLOBAL_TAG_TYPES_ENUM = ['self', 'apply'];
export const GENERAL_TAG_TYPES_ENUM = ['skill', 'action', 'mod'];
export const GENERAL_OPTIONS_ENUM = ['name', 'value', 'modType', 'modTarget'];

export const STATUS_TYPES_EFFECTS_ENUM = [
  'addSelfStatus',
  'removeSelfStatus',
  'addStatus',
  'removeStatus',
];

export const NON_STATUS_TYPES_EFFECTS_ENUM = [
  'triggerEvent',
  'addLore',
  'sendMessage',
];

export const EFFECTS_TAG_TYPES_ENUM = [
  ...STATUS_TYPES_EFFECTS_ENUM,
  ...NON_STATUS_TYPES_EFFECTS_ENUM,
];
export const TAG_TYPES_ENUM = [
  ...GLOBAL_TAG_TYPES_ENUM,
  ...GENERAL_TAG_TYPES_ENUM,
  ...EFFECTS_TAG_TYPES_ENUM,
];

export const CONDITIONS_ENUM = ['outerConditions', 'conditions'];
export const CONDITIONS_OPTIONS_ENUM = ['and', 'or'];
export const CONDITIONS_STATUS_OPTIONS_ENUM = ['status', 'notStatus'];
export const CONDITIONS_LORE_VALUES_ENUM = ['knownLore', 'unknownLore'];
export const CONDITIONS_VALUES_ENUM = [
  ...CONDITIONS_STATUS_OPTIONS_ENUM,
  ...CONDITIONS_LORE_VALUES_ENUM,
  'lastAction',
];

export const OPTIONS_ENUM = ['lockable'];

export const MOD_TYPES_ENUM = ['attribute', 'skill'];

export const CORE_INPUT_NAME_ENUM = ['actions', 'tags'];

export const SELECT_ENUMS: {
  [index: string]: string[] | boolean[] | { key: string; value: string }[];
} = {
  itemZoneSelect: itemZones.map(zone => {
    return { value: zone.zones + ``, key: zone.key };
  }),
  nodeType: NODE_TYPE,
  status: STATUS_ENUM,
  attr: ATTRS_ENUM,
  diff: DIFF_ENUM,
  boolean: [true, false],
  options: OPTIONS_ENUM,
};
