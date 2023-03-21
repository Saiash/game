import { Character } from '..';
import { CTX } from '../../../../types';
import { ModificatorManager } from '../../../managers/ModificatorManager';

export class SecondaryAttribute {
  character: Character;
  ctx: CTX;
  name: string;
  modificatorManager: ModificatorManager;

  constructor({ ctx, character }: { character: Character; ctx: CTX }) {
    this.character = character;
    this.ctx = ctx;
    this.name = '';
    this.modificatorManager = new ModificatorManager();
  }

  getName(): string {
    return this.name;
  }

  getModsValue(): number {
    return this.modificatorManager.getValue();
  }
}
