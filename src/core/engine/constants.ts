import { ActionPayload } from './actionConnector';

export const BASE_TIME_PER_ACTION = 2;

export enum ACTION_PAYLOAD_TYPE {
  UNEQUIP_ITEM = 'unequipItem',
  SYSTEM_EVENT = 'systemEvent',
  LOCK_ITEM = 'lockItem',
  EQUIP_ITEM = 'equipItem',
  USE_SKILL = 'useSkill',
  USE_PERK = 'usePerk',
  USE_ACTION = 'useAction',
}
