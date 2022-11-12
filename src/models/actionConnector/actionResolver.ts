import { CTX } from '../../types';
import { GameData } from '../gameData';
import { ActionPayload, ActionConnector } from '.';

export class ActionResolver {
  gameData: GameData;
  actionConnector: ActionConnector;
  ctx: CTX;

  constructor({
    ctx,
    gameData,
    actionConnector,
  }: {
    ctx: CTX;
    gameData: GameData;
    actionConnector: ActionConnector;
  }) {
    this.ctx = ctx;
    this.gameData = gameData;
    this.actionConnector = actionConnector;
  }

  async performAction(input: ActionPayload): Promise<boolean> {
    return this.actionConnector.performAction(input);
  }
}
