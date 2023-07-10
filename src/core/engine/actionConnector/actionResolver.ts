import { CTX } from '../../../types';
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
    //TODO
    //Где-то здесь мы уже должны понимать, что именно мы делаем
    //в тч распарсить и создать тэг - что бы узнать, например, КАК долго он выполняется
    //или если это агрессивное действие - и оно может быть прервано

    //Тут мы получили входные сырые данные
    //Мы хотим проверить их на условия
    //Согласно проверенным условиям - мутировать на правильное состояние
    //Потом - применить побочные эффекты, а-ка прошедшее время
    this.appendTime(input['payload']);
    //После этого - уже применить эффект
    return this.actionConnector.performAction(input);
  }

  appendTime(payload: ActionPayload['payload']) {
    const { type } = payload;
    //TODO: сделать честный рассчет времени
    this.ctx.gameData.timeManager.calcTimeSpent(600);
  }
}
