import { CTX } from '../../../types';
import { GameData } from '../gameData';
import { ActionPayload, ActionConnector } from '.';
import { ACTION_PAYLOAD_TYPE } from '../constants';

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
    this.appendTime(input);
    //После этого - уже применить эффект
    return this.actionConnector.performAction(input);
  }

  appendTime(payload: ActionPayload) {
    if (payload.time) {
      this.ctx.gameData.timeManager.calcTimeSpent(payload.time);
    } else if (payload.payload.type === ACTION_PAYLOAD_TYPE.USE_SKILL) {
      const skillTime = payload.sourceActor?.skillManager
        .getByCode(payload.payload.skill)
        ?.getDefaultSkillTime();
      this.ctx.gameData.timeManager.calcTimeSpent(skillTime || 60);
    } else if (payload.payload.type === ACTION_PAYLOAD_TYPE.EQUIP_ITEM) {
      const item = payload.sourceActor?.inventory.getItem(
        payload.payload.itemIndex || 0
      );
      this.ctx.gameData.timeManager.calcTimeSpent(item?.getDonningTime() || 3);
    } else if (payload.payload.type === ACTION_PAYLOAD_TYPE.UNEQUIP_ITEM) {
      const item = this.ctx.gameData.items[payload.payload.itemId];
      this.ctx.gameData.timeManager.calcTimeSpent(
        item?.getDonningTime() / 2 || 3
      );
    }
  }
}
