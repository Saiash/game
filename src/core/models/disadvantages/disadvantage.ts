import { disadvantageList } from '.';
import { CTX } from '../../../types';
import { Character } from '../characters';

export type rawDisadvantageModel = {
  name: string;
  code: disadvantageList;
  description: string;
  level: number;
  tags: string;
};

export class Disadvantage {
  private ctx: CTX;
  private level: number;
  private code: rawDisadvantageModel['code'];

  constructor({ ctx, data }: { ctx: CTX; data: rawDisadvantageModel }) {
    this.ctx = ctx;
    this.code = data.code;
    this.level = data.level;
  }
}
