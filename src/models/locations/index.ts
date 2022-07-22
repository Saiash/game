import { CTX } from '../../types';
import { Character } from '../characters';
import { TagSystem } from '../tag';
import { ObjectModel } from './object';

export class Location {
  name: string;
  code: string;
  description: string;
  connections: string[];
  tags: TagSystem;
  ctx: CTX;
  characters: Character[];
  objects: ObjectModel[];

  constructor({
    ctx,
    data,
  }: {
    ctx: CTX;
    data: {
      name: string;
      code: string;
      description: string;
      connections: string[];
    };
  }) {
    this.ctx = ctx;
    this.connections = data.connections;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.characters = [];
    this.objects = [];
    this.tags = new TagSystem(ctx);
  }

  addObject(object: ObjectModel) {
    this.objects.push(object);
  }

  addCharacter(character: Character) {
    this.characters.push(character);
  }
}
