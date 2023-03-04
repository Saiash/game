import { Character } from '..';
import { CTX } from '../../../../types';

export class SecondaryAttribute {
  character: Character;
  ctx: CTX;
  name: string;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    this.character = character;
    this.ctx = ctx;
    this.name = '';
  }

  getName(): string {
    return this.name;
  }
}
