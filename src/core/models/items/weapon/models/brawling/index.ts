import { Fist } from './fist';
import { Leg } from './leg';
import { BrassKnuckles } from './brassKnuckles';
import { Teeth } from './teeth';
import { Fangs } from './fangs';
import { Beak } from './beak';
import { SharpTeeth } from './sharpTeeth';
import { Club } from './club';
import { Stunner } from './stunner';

export type brawlingList =
  | 'fist'
  | 'brassKnuckles'
  | 'leg'
  | 'teeth'
  | 'fangs'
  | 'sharpTeeth'
  | 'club'
  | 'stunner'
  | 'beak';

export const brawlingModels = {
  fist: Fist,
  brassKnuckles: BrassKnuckles,
  leg: Leg,
  teeth: Teeth,
  fangs: Fangs,
  beak: Beak,
  sharpTeeth: SharpTeeth,
  club: Club,
  stunner: Stunner,
};
