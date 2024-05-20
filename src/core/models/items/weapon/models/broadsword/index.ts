import { BastardSword } from './bastardSword';
import { Broadsword } from './broadsword';
import { CavalrySaber } from './cavalrySaber';
import { Katana } from './katana';
import { LightClub } from './lightClub';
import { StabbingBastardSword } from './stabbingBastardSword';
import { StabbingBroadsword } from './stabbingBroadsword';

export type broadswordList =
  | 'lightClub'
  | 'broadsword'
  | 'stabbingBroadsword'
  | 'bastardSword'
  | 'stabbingBastardSword'
  | 'cavalrySaber'
  | 'katana';

export const broadswordModels = {
  lightClub: LightClub,
  broadsword: Broadsword,
  stabbingBroadsword: StabbingBroadsword,
  bastardSword: BastardSword,
  katana: Katana,
  stabbingBastardSword: StabbingBastardSword,
  cavalrySaber: CavalrySaber,
};
