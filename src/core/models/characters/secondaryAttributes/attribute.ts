import { Character } from '..';
import { CTX } from '../../../../types';
import { ModificatorManager } from '../../../managers/ModificatorManager';
import { throwDices } from '../../../utils/diceThrower';
import { CheckResults } from '../skills/types';

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

  getValue() {
    return 1;
  }

  check(difficulty: number = 0): CheckResults {
    const rand = throwDices(3, 6);
    const attrValue = this.getValue();
    const result = rand <= attrValue + difficulty;
    const successMargin = rand - (attrValue + difficulty);
    return { rand, value: attrValue, result, difficulty, successMargin };
  }
}
