import { Context, GameData } from '../models';

export type CTX = {
  update: (data: CTX) => void;
  context: Context;
  dataSource: {
    swr: any;
    dataloaders: { [index: string]: (data: any) => any };
  };
  gameData: GameData;
  setTextNodeId: (textNodeId: string) => void;
  setTextSceneId: (textSceneId: string) => void;
};
