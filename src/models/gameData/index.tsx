import { Character } from '../../models/characters';
import { Item } from '../../models/characters/inventory/item';
import { Skill } from '../characters/skills/skill';

import type { CTX } from '../../types/';

export class GameData {
  playerCharacter: Character;
  dataloaders: CTX['dataloaders'];

  constructor(dataloaders: CTX['dataloaders']) {
    this.dataloaders = dataloaders;
    this.playerCharacter = new Character({
      name: 'Test Name',
    });
  }

  getPlayerCharacter(): Character {
    return this.playerCharacter;
  }

  async initialLoading() {
    const item = await Item.initByName(this.dataloaders, 'padded_mittens');
    const item2 = await Item.initByName(this.dataloaders, 'leather_gloves');
    const item3 = await Item.initByName(this.dataloaders, 'hand_cuffs');
    const item4 = await Item.initByName(this.dataloaders, 'knife');
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
