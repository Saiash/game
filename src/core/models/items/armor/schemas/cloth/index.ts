import { boots } from './boots';
import { dress } from './dress';
import { footWraps } from './footWraps';
import { gloves } from './gloves';
import { hat } from './hat';
import { hoodedDress } from './hoodedDress';
import { mittens } from './mittens';
import { moccasins } from './moccasins';
import { sandals } from './sandals';
import { shoes } from './shoes';

export type clothSchemasList =
  | 'boots'
  | 'dress'
  | 'footWraps'
  | 'gloves'
  | 'hoodedDress'
  | 'mittens'
  | 'moccasins'
  | 'sandals'
  | 'shoes'
  | 'hat';

export const clothSchemasModels = {
  boots: boots,
  dress: dress,
  footWraps: footWraps,
  gloves: gloves,
  hat: hat,
  hoodedDress: hoodedDress,
  moccasins: moccasins,
  mittens: mittens,
  shoes: shoes,
  sandals: sandals,
};
