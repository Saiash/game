import { Los46 } from './los46';
import { losGauss } from './losGauss';
import { Smg45 } from './smg45';
import { Smg9 } from './smg9';

export type beamList = 'los46' | 'losGauss' | 'smg9' | 'smg45';

export const beamModels = {
  los46: Los46,
  losGauss: losGauss,
  smg9: Smg9,
  smg45: Smg45,
};
