import { BoardSaber } from './boardSaber';
import { ShortSword } from './shortSword';
import { Stick } from './stick';

export type smallswordList = 'stick' | 'shortSword' | 'boardSaber';

export const smallswordModels = {
  stick: Stick,
  shortSword: ShortSword,
  boardSaber: BoardSaber,
};
