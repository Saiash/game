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

  performAction(input: ActionPayload): boolean {
    return this.actionConnector.performAction(input);
  }
}
