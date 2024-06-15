// yarn test src/core/engine/actionConnector/__tests__/actionResolver.test.ts

import ctxMock from '../../gameData/__fixtures__/gameData';
import { ACTION_PAYLOAD_TYPE } from '../../constants';
import { ActionResolver } from '../actionResolver';

const resolver = new ActionResolver({
  ctx: ctxMock,
  gameData: ctxMock.gameData,
  actionConnector: ctxMock.gameData.actionConnector,
});

describe('ActionResolver()', () => {
  beforeEach(async () => {});

  it('Запускаем взлом без каких-то параметров', async () => {
    await resolver.performAction({
      sourceActor: ctxMock.gameData.getPlayerCharacter(),
      payload: {
        type: ACTION_PAYLOAD_TYPE.USE_SKILL,
        difficulty: 0,
        timeMod: 0,
        skill: 'lockpicking',
      },
    });
    expect(
      ctxMock.gameData.timeManager.getCurrentTime().format('hh:mm:ss')
    ).toEqual('09:25:00');
  });

  it('Запускаем взлом с предустановленным временем', async () => {
    await resolver.performAction({
      sourceActor: ctxMock.gameData.getPlayerCharacter(),
      time: 10,
      payload: {
        type: ACTION_PAYLOAD_TYPE.USE_SKILL,
        difficulty: 0,
        timeMod: 0,
        skill: 'lockpicking',
      },
    });
    expect(
      ctxMock.gameData.timeManager.getCurrentTime().format('hh:mm:ss')
    ).toEqual('09:25:10');
  });
});
