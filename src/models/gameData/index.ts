import { Character } from '../characters';
import { Item } from '../characters/inventory/item';
import { Skill } from '../characters/skills/skill';

import type { CTX } from '../../types';
import { Connector } from '../connector';
import { Log } from './Log';

export class GameData {
  playerCharacter: Character;
  connector: Connector;
  dataloaders: CTX['dataloaders'];
  log: Log;
  ctx: CTX;
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
    this.dataloaders = dataloaders;
    this.playerCharacter = new Character({ ctx, name: 'Test Name' });
    this.connector = new Connector({ ctx, gameData: this });
    this.log = new Log();
  }

  getPlayerCharacter(): Character {
    return this.playerCharacter;
  }

  async initialLoading() {
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
  }
}
