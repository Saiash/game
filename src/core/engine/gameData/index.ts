import { Character } from '../../models/characters';
import { Item } from '../../models/characters/inventory/item';

import type { CTX } from '../../../types';
import { ActionConnector } from '../../engine/actionConnector';
import { ActionResolver } from '../../engine/actionConnector/actionResolver';
import { Log } from './Log';
import { Location } from '../../models/locations';
import { ObjectModel } from '../../models/locations/object';
import { TimeManager } from './timeManager';
import { SceneEngine } from '../../engine/SceneEngine';

export class GameData {
  playerCharacter: Character;
  playerTarget: Character | ObjectModel | null;
  actionConnector: ActionConnector;
  actionResolver: ActionResolver;
  dataloaders: CTX['dataloaders'];
  log: Log;
  ctx: CTX;
  characters: { [index: number]: Character };
  locations: { [index: string]: Location };
  objects: { [index: string]: ObjectModel };
  timeManager: TimeManager;
  sceneEngine: SceneEngine;
  //время
  //локация
  //персонажи

  constructor({
    ctx,
    dataloaders,
  }: {
    ctx: CTX;
    dataloaders: CTX['dataloaders'];
  }) {
    this.ctx = ctx;
    this.objects = {};
    this.locations = {};
    this.characters = {};
    this.playerTarget = null;
    this.dataloaders = dataloaders;
    this.playerCharacter = this.addCharacter(
      'Test test',
      this.addLocation({
        name: 'defaultLocation',
        description: 'defaultLocation',
        code: 'defaultLocation',
        connections: ['defaultLocation_2'],
      })
    );
    this.actionConnector = new ActionConnector({ ctx, gameData: this });
    this.actionResolver = new ActionResolver({
      ctx,
      gameData: this,
      actionConnector: this.actionConnector,
    });
    this.log = new Log(ctx);
    this.timeManager = new TimeManager({ ctx });
    this.sceneEngine = new SceneEngine({ ctx });
  }

  getPlayerCharacter(): Character {
    return this.playerCharacter;
  }

  async initialLoading() {
    this.addLocation({
      name: 'defaultLocation_2',
      description: 'defaultLocation_2',
      code: 'defaultLocation_2',
      connections: ['defaultLocation'],
    });
    const item = await Item.initByName({
      ctx: this.ctx,
      dataloaders: this.dataloaders,
      name: 'padded_mittens',
    });
    const item2 = await Item.initByName({
      ctx: this.ctx,
      dataloaders: this.dataloaders,
      name: 'leather_gloves',
    });
    const item3 = await Item.initByName({
      ctx: this.ctx,
      dataloaders: this.dataloaders,
      name: 'hand_cuffs',
    });
    const item4 = await Item.initByName({
      ctx: this.ctx,
      dataloaders: this.dataloaders,
      name: 'knife',
    });
    await this.playerCharacter.inventory.add(item);
    await this.playerCharacter.inventory.add(item2);
    await this.playerCharacter.inventory.add(item3);
    await this.playerCharacter.inventory.add(item4);
    await this.playerCharacter.skills.add({
      dataloaders: this.dataloaders,
      name: 'lockpicking',
      exp: 1,
    });
    // await this.playerCharacter.lore.add({
    //   dataloaders: this.dataloaders,
    //   name: 'lore_1',
    // });
    await this.addObject({
      name: 'chest_test',
      location: this.locations.defaultLocation,
    });
    await this.addObject({
      name: 'chest_test_2',
      location: this.locations.defaultLocation,
    });
    await this.sceneEngine.initScene('scene_1');
  }

  addLocation({
    name,
    description,
    code,
    connections,
  }: {
    name: string;
    description: string;
    code: string;
    connections: string[];
  }) {
    const location = new Location({
      ctx: this.ctx,
      data: {
        name,
        description,
        code,
        connections,
      },
    });
    this.locations[code] = location;
    return location;
  }

  removeLocation(code: string) {
    delete this.locations[code];
  }

  addCharacter(name: string, location: Location) {
    const character = new Character({
      ctx: this.ctx,
      name,
      location,
    });
    this.characters[character.id] = character;
    location.addCharacter(character);
    return character;
  }

  removeCharacter(id: number) {
    delete this.characters[id];
  }

  async addObject({ name, location }: { name: string; location: Location }) {
    const data = await this.dataloaders.getObject(name);
    const object = new ObjectModel({
      ctx: this.ctx,
      location,
      data,
    });
    location.addObject(object);
  }

  removeObject(code: string) {
    delete this.objects[code];
  }

  selectTarget(target: Character | ObjectModel) {
    this.playerTarget = target;
  }

  getPlayerTarget() {
    return this.playerTarget;
  }
}
