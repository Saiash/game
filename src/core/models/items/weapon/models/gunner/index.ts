import { AntiairMissile } from './antiairMissile';
import { Atgm } from './atgm';

export type gunnerList = 'antiairMissile' | 'atgm';

export const gunnerModels = { antiairMissile: AntiairMissile, atgm: Atgm };
