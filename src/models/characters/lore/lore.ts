import { CTX } from '../../../types';

let id = 0;

export class Lore {
  private ctx: CTX;
  private id: number;
  private description: string;
  private title: string;

  constructor({ ctx, props }: { ctx: CTX; props: any }) {
    this.ctx = ctx;
    this.id = id++;
    this.description = props.description;
    this.title = props.title;
  }
}
