import { GameData } from '../core/engine/gameData';
import { locale } from '../translations';

export type CTX = {
  language: locale;
  update: (data: CTX) => void;
  dataloaders: {
    [index: string]: (data: any) => any;
  };
  gameData: GameData;
  setTextNodeId: (textNodeId: string) => void;
  setTextSceneId: (textSceneId: string) => void;
};

export type PartialRecord<K extends string, T> = {
  [P in K]?: T;
};
