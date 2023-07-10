import { CTX } from '../../../types';
import { Character } from '../characters';
import { TagSystem } from '../../managers/tag';
import { ObjectModel } from './object';

let locationId = 0;

export class Location {
  private id: number;
  private name: string;
  private code: string;
  private description: string;
  private connections: string[];
  private tags: TagSystem;
  private ctx: CTX;
  private characters: Character[];
  private objects: ObjectModel[];
  private status: string[] = [];
  private locked: boolean;
  private lockable: boolean;

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
      locked?: boolean;
      lockable?: boolean;
    };
  }) {
    this.id = locationId++;
    this.ctx = ctx;
    this.connections = data.connections;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.characters = [];
    this.objects = [];
    this.locked = data.locked || false;
    this.lockable = data.lockable || false;
    this.tags = new TagSystem({ ctx, owner: this });
  }

  addObject(object: ObjectModel): void {
    this.objects.push(object);
  }

  addCharacter(character: Character): void {
    this.characters.push(character);
  }

  removeObject(object: ObjectModel): void {
    this.objects.filter(obj => obj.getId() === object.getId());
  }

  removeCharacter(character: Character): void {
    this.characters.filter(chr => chr.getId() === character.getId());
  }

  hasStatus(status: string): boolean {
    return this.status.some(s => {
      return s === status;
    });
  }

  addStatus(status: string): boolean {
    if (this.hasStatus(status)) return false;
    this.status.push(status);
    this.tags.conditionChanged(status);
    return true;
  }

  removeStatus(status: string): boolean {
    this.status = this.status.filter(s => s !== status);
    this.tags.conditionChanged(status);
    return true;
  }

  lock() {
    this.locked = true;
    this.tags.conditionChanged('locked');
    return true;
  }

  unlock() {
    this.locked = false;
    this.tags.conditionChanged('locked');
    return true;
  }

  isLockable() {
    return this.lockable && !this.locked;
  }

  isLocked() {
    return this.locked;
  }

  getConnections() {
    return this.connections;
  }

  getDescription() {
    return this.description;
  }

  getName() {
    return this.name;
  }

  getObjects() {
    return this.objects;
  }

  getId() {
    return this.id;
  }
}
