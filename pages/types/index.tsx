import { Context, GameData } from '../models';

export type CTX = {
  context: Context;
  dataSource: { swr: any };
  gameData: GameData;
  setTextNodeId: React.Dispatch<React.SetStateAction<string>>;
  setTextSceneId: React.Dispatch<React.SetStateAction<string>>;
};
