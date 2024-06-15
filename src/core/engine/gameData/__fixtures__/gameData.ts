import { GameData } from '..';
import { CTX } from '../../../../types';

const ctxMock: CTX = {
  gameData: {} as GameData,
  language: 'ru',
  dataloaders: {},
  update: () => {},
  setTextNodeId: () => {},
  setTextSceneId: () => {},
};
const gameData = new GameData({ ctx: ctxMock, dataloaders: {} });
ctxMock.gameData = gameData;
gameData.addLocation({
  name: 'defaultLocation',
  description: 'defaultLocation',
  code: 'defaultLocation',
  connections: [],
});

const player = gameData.addCharacter(
  'Female_Character',
  gameData.getLocation('defaultLocation')
);
gameData.setPlayerCharacter(player);
player.skillManager.add({
  name: 'lockpicking',
  exp: 1,
});

export default ctxMock;
