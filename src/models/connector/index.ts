import { CTX } from '../../types';
import { Character } from '../characters';
import { Item } from '../characters/inventory/item';
import { GameData } from '../gameData';

export type ActionPayload = {
  sourceActor?: Character;
  target?: Character | Item;
  action: 'useSkill';
  payload: { difficulty: number; timeMod: number; skill: string };
};

export class Connector {
  gameData: GameData;
  ctx: CTX;

  constructor({ ctx, gameData }: { ctx: CTX; gameData: GameData }) {
    this.ctx = ctx;
    this.gameData = gameData;
  }

  performAction(input: ActionPayload): boolean {
    const { sourceActor, action } = input;
    if (action === 'useSkill' && sourceActor) {
      return this.resolveSkillUsage(input);
    }
    return false;
  }

  resolveSkillUsage(input: ActionPayload): boolean {
    const { sourceActor } = input;
    if (!sourceActor) return false;
    return sourceActor.skills.resolve(input);
  }
}
