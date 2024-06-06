import { Character } from '../../models/characters';

import type { CTX } from '../../../types';
import { ActionConnector } from '../../engine/actionConnector';
import { ActionResolver } from '../../engine/actionConnector/actionResolver';
import { Log } from './Log';
import { Location } from '../../models/locations';
import { ObjectModel } from '../../models/locations/object';
import { TimeManager } from './timeManager';
import { SceneEngine } from '../../engine/SceneEngine';
import { initGame } from '../../script/initGame';
import { materialModels } from '../../models/items/modifications/models/materials';
import { Item, ItemId } from '../../models/items/item';
import { BattleEngine } from '../battleEngine';

export class GameData {
  private playerCharacter: Character | null;
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
  items: Record<ItemId, Item>;
  battleEngine: BattleEngine;
  //TODO: время
  //TODO: локация
  //TODO: персонажи

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
    this.playerCharacter = null;
    this.actionConnector = new ActionConnector({ ctx, gameData: this });
    this.actionResolver = new ActionResolver({
      ctx,
      gameData: this,
      actionConnector: this.actionConnector,
    });
    this.items = {};
    this.log = new Log(ctx);
    this.timeManager = new TimeManager({ ctx });
    this.sceneEngine = new SceneEngine({ ctx });
    this.battleEngine = new BattleEngine({ ctx });
  }

  getPlayerCharacter(): Character {
    if (!this.playerCharacter) {
      this.playerCharacter = this.addCharacter(
        'Test test',
        this.getLocation('defaultLocation')
      );
    }
    return this.playerCharacter;
  }

  setPlayerCharacter(character: Character) {
    this.playerCharacter = character;
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

  getLocation(code: string) {
    return this.locations[code];
  }

  removeLocation(code: string) {
    delete this.locations[code];
  }

  addCharacter(name: string, location: Location) {
    const character = new Character({
      ctx: this.ctx,
      name,
      location,
      gender: 'female',
    });
    this.characters[character.getId()] = character;
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

  async initialLoading() {
    await initGame(this);
  }
}
