import { Character } from '../..';
import { CTX } from '../../../../../types';
import { SecondaryAttribute } from '../attribute';
import { Weight } from './weight';

export class Dodge extends SecondaryAttribute {
  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    super({ ctx, character });
  }

  getRawValue() {
    return (
      Math.floor(
        this.character.attributeManager.getByCode('speed')?.getValue() || 0
      ) + 3
    );
  }

  getValue(): number {
    const encumbrance = this.character.secondaryAttributes
      .getByCode<Weight>('weight')
      .encumbrance();
    return Math.max(
      ...[this.getRawValue() - encumbrance + this.getModsValue(), 1]
    );
  }
}
