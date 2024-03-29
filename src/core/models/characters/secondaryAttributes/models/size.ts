import { Character } from '../..';
import { CTX } from '../../../../../types';
import { SecondaryAttribute } from '../attribute';

export class Size extends SecondaryAttribute {
  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
  }

  getRawValue(): number {
    return 0 + this.getModsValue();
  }
}
