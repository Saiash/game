import { CTX } from '../../types';
import { Character } from '../characters';
import { Item } from '../characters/inventory/item';
import { GameData } from '../gameData';

export type useSkillPayload = {
  type: 'useSkill';
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
  target?: Character | Item;
  payload:
    | useSkillPayload
    | equipItemPayload
    | lockItemPayload
    | unequipItemPayload;
};

export class ActionConnector {
  gameData: GameData;
  ctx: CTX;

  constructor({ ctx, gameData }: { ctx: CTX; gameData: GameData }) {
    this.ctx = ctx;
    this.gameData = gameData;
  }

  performAction(input: ActionPayload): boolean {
    const {
      sourceActor,
      payload: { type },
    } = input;
    if (type === 'useSkill' && sourceActor) {
      return this.resolveSkillUsage(input);
    } else if (type === 'equipItem' && sourceActor) {
      return this.resolveEquipItem(input);
    } else if (type === 'unequipItem' && sourceActor) {
      return this.resolveEquipItem(input);
    } else if (type === 'lockItem' && sourceActor) {
      return this.resolveEquipItem(input);
    }
    return false;
  }

  resolveSkillUsage(input: ActionPayload): boolean {
    if (input.payload.type !== 'useSkill') return false;
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.skills.resolve(input);
  }

  resolveEquipItem(input: ActionPayload): boolean {
    if (input.payload.type !== 'equipItem') return false;
    const {
      target,
      sourceActor,
      payload: { itemIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.id === target.id) {
      return sourceActor.doll.equipFromInventory({ index: itemIndex });
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }

  resolveLockItem(input: ActionPayload): boolean {
    if (input.payload.type !== 'lockItem') return false;
    const {
      target,
      sourceActor,
      payload: { zoneIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.id === target.id) {
      const item = sourceActor.doll.getItemByZone(zoneIndex);
      if (!item) return false;
      return item.lock();
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }

  resolveUnequipItem(input: ActionPayload): boolean {
    if (input.payload.type !== 'unequipItem') return false;
    const {
      target,
      sourceActor,
      payload: { zoneIndex },
    } = input;
    if (!sourceActor || !target) return false;
    if (sourceActor.id === target.id) {
      return sourceActor.doll.uneqipItem({ zoneIndex });
    }
    throw Error('Доделать использование предметов на других персонажей!');
  }
}
