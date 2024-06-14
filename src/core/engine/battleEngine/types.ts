import { Character } from '../../models/characters';
import { battleZones } from '../../models/items/doll/types';
import { weaponManagerTypes } from '../../models/items/weapon';
import { damageType } from '../../models/items/weapon/damage';

export type characterBattleInfo = {
  character: Character;
  status: characterStatus;
};

export type pose = 'stand' | 'lay' | 'crouch';
export type direction = 'n' | 's' | 'nw' | 'ne' | 'se' | 'sw';
export type battleManeurs =
  | 'aim'
  | 'attack'
  | 'totalAttack'
  | 'totalDefence'
  | 'defence'
  | 'changePose'
  | 'concentration'
  | 'wait'
  | 'watch'
  | 'feint'
  | 'move'
  | 'moveAndAttack'
  | 'ready'
  | 'prepare';

export type totallAttackTypes =
  | 'strong'
  | 'determined'
  | 'double'
  | 'feint'
  | 'suppressionFire';

export type totallDefenceTypes = 'double' | 'determined';

export type actionPayloadOptions = {
  actionType?: totallAttackTypes;
};

export type actionPayload = {
  action: battleManeurs;
  actorId: number;
  targetId: number;
  options: actionPayloadOptions;
};
//TODO: хранить историю изменения состояний в бою?
export type characterStatus = {
  coordinates: { x: number; y: number; direction: direction };
  movement: number;
  maxMovement: number;
  fastAction: boolean;
  action: boolean;
  stunned: boolean;
  defense: {
    availible: boolean;
    dodgePentaly: number;
    parryPentaly: number;
    blockPenalty: number;
  };
  aim: {
    target: number;
    turnsCount: number;
  };
  watch: {
    target: number;
    turnsCount: number;
  };
  pose: pose;
};

export type defenceOptions = {
  type: 'block' | 'dodge' | 'parry';
  totalDefenceOptions?: 'double' | 'improved';
  retreat?: boolean;
  damagePayload: damagePayload;
};

export type battleActionPayload = {
  actorId: number;
  maneur: battleManeurs;
  attackOptions?: attackOptions;
  defenceOptions?: defenceOptions;
  otherOptions?: otherOptions;
};

export type attackType = 'swing' | 'thrust';

export type attackOptions = {
  hand: 'right' | 'left';
  target: number;
  zone: battleZones;
  setIndex: number;
  attackType: weaponManagerTypes;
  options?: {
    type?: totallAttackTypes | totallDefenceTypes;
    dmgMod?: number;
    accuracy?: number;
  };
  rof?: number;
};

export type otherOptions = {
  changePoseDirection?: 'up' | 'down';
};

export type damagePayload = {
  zone: battleZones;
  value: number;
  type: damageType;
  armorDelimiter: number;
  amountOfHits: number;
};
