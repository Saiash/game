import { CTX } from '../../types';
import { Character } from '../characters';
import { Item } from '../characters/inventory/item';
import { GameData } from '../gameData';
import { Location } from '../locations';
import { ObjectModel } from '../locations/object';
import { Tag } from '../tag/models/tag';

export type useSkillPayload = {
  type: 'useSkill';
  tag: Tag;
  difficulty: number;
  timeMod: number;
  skill: string;
  options?: {
    offHand: boolean;
  };
};
type equipItemPayload = { type: 'equipItem'; itemIndex: number };
type lockItemPayload = { type: 'lockItem'; zoneIndex: number };
type unequipItemPayload = { type: 'unequipItem'; zoneIndex: number };

export type ActionPayload = {
  sourceActor?: Character;
  target?: Character | Item | Location | ObjectModel;
  payload:
    | useSkillPayload
    | equipItemPayload
    | lockItemPayload
    | unequipItemPayload;
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

  async resolveSkillUsage(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== 'useSkill') return false;
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.skills.resolve(input);
  }

  async resolveEquipItem(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== 'equipItem') return false;
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
    if (input.payload.type !== 'lockItem') return false;
    const {
      target,
      sourceActor,
      payload: { zoneIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.getId() === target.getId()) {
      const item = sourceActor.doll.getItemByZone(zoneIndex);
      if (!item) return false;
      return item.lock();
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }

  async resolveUnequipItem(input: ActionPayload): Promise<boolean> {
    if (input.payload.type !== 'unequipItem') return false;
    const {
      target,
      sourceActor,
      payload: { zoneIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.getId() === target.getId()) {
      return sourceActor.doll.uneqipItem({ zoneIndex });
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }
}
