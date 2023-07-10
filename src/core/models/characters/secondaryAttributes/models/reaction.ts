import { Character } from '../..';
import { CTX } from '../../../../../types';
import { SecondaryAttribute } from '../attribute';

export class Reaction extends SecondaryAttribute {
  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
    this.name = 'Reaction';
  }

  getRawValue(): number {
    return 0 + this.getModsValue();
  }
}
