import { CTX } from '../../../../types';
import { raceSettingsRaw } from './models';

export class Race {
  name: string;
  description: string;
  ctx: CTX;

  constructor(input: raceSettingsRaw, ctx: CTX) {
    this.name = input.name;
    this.description = input.description;
    this.ctx = ctx;
  }
}
