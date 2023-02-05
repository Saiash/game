import {  GameData } from '../models';

export type CTX = {
  update: (data: CTX) => void;
  dataloaders: {
    [index: string]: (data: any) => any;
  };
  gameData: GameData;
  setTextNodeId: (textNodeId: string) => void;
  setTextSceneId: (textSceneId: string) => void;
};
