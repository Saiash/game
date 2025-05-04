import { CTX } from '../../../types';
import { Character } from '../../models/characters';
import { GameData } from '../gameData';
import { EventAction } from '../../managers/tag/models/tag';
import { TagSystem } from '../../managers/tag';
import { ACTION_PAYLOAD_TYPE } from '../constants';
import { skillList } from '../../models/characters/skills/models';
import { perkList } from '../../models/perks';
import { ItemId } from '../../models/items/item';

export type useSkillPayload = {
  type: ACTION_PAYLOAD_TYPE.USE_SKILL;
  difficulty: number;
  timeMod: number;
  skill: skillList;
  onSuccsess?: EventAction[];
  onFail?: EventAction[];
  options?: {
    offHand: boolean;
  };
};
type usePerkPayload = {
  type: ACTION_PAYLOAD_TYPE.USE_PERK;
  perk: perkList;
};
type useActionPayload = {
  type: ACTION_PAYLOAD_TYPE.USE_ACTION;
  action: string;
};
type equipItemPayload = {
  type: ACTION_PAYLOAD_TYPE.EQUIP_ITEM;
  itemIndex: number;
};
type lockItemPayload = {
  type: ACTION_PAYLOAD_TYPE.LOCK_ITEM;
  itemId: ItemId;
};
type unequipItemPayload = {
  type: ACTION_PAYLOAD_TYPE.UNEQUIP_ITEM;
  itemId: ItemId;
};
type systemEventPayload = { type: ACTION_PAYLOAD_TYPE.SYSTEM_EVENT };

export type ActionPayload = {
  sourceActor?: Character;
  target?: TagSystem['owner'];
  time?: number;
  payload:
  | useSkillPayload
  | usePerkPayload
  | useActionPayload
  | equipItemPayload
  | lockItemPayload
  | unequipItemPayload
  | systemEventPayload;
};

export class ActionConnector {
  gameData: GameData;
  ctx: CTX;
  resolvers: { [index: string]: (input: ActionPayload) => Promise<boolean> };

  constructor({ ctx, gameData }: { ctx: CTX; gameData: GameData }) {
    this.ctx = ctx;
    this.gameData = gameData;
    this.resolvers = {
      useSkill: this.resolveSkillUsage,
      usePerk: this.resolvePerkUsage,
      useAction: this.resolveActionUsage,
      equipItem: this.resolveEquipItem,
      unequipItem: this.resolveUnequipItem,
      lockItem: this.resolveLockItem,
    };
  }

  async performAction(input: ActionPayload): Promise<boolean> {
    const {
      payload: { type },
    } = input;
    return this.resolvers[type] ? this.resolvers[type](input) : false;
  }

  async resolvePerkUsage(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_PERK) return false;
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.perkManager.resolve(input);
  }

  async resolveActionUsage(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL) return false;
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.skillManager.resolve(input);
  }

  async resolveSkillUsage(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL) return false;
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.skillManager.resolve(input);
  }

  async resolveEquipItem(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.EQUIP_ITEM) return false;
    const {
      target,
      sourceActor,
      payload: { itemIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.getId() === target.getId()) {
      return sourceActor.doll.equipFromInventory({ index: itemIndex });
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }

  async resolveLockItem(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.LOCK_ITEM) return false;
    const {
      target,
      sourceActor,
      payload: { itemId },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.getId() === target.getId()) {
      const item = sourceActor.doll.getItemById(itemId);
      if (!item) return false;
      return item.lock();
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }

  async resolveUnequipItem(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.UNEQUIP_ITEM) return false;
    const {
      target,
      sourceActor,
      payload: { itemId },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.getId() === target.getId()) {
      return sourceActor.doll.unequipItem({ itemId, performer: sourceActor });
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }
}
