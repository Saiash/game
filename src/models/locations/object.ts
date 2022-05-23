import { Location } from '.';
import { CTX } from '../../types';
import { TagSystem } from '../tag';

export class ObjectModel {
  name: string;
  code: string;
  description: string;
  tags: TagSystem;
  ctx: CTX;
  location: Location;

  constructor({
    ctx,
    data,
  }: {
    ctx: CTX;
    data: {
      name: string;
      code: string;
      description: string;
      location: Location;
    };
  }) {
    this.location = data.location;
    this.ctx = ctx;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.tags = new TagSystem(ctx);
  }
}
