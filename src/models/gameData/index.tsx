import { Character } from '../../models/characters';
import { Item } from '../../models/characters/inventory/item';
import type { CTX } from '../../types/';

export class GameData {
  playerCharacter: Character;
  dataSource: CTX['dataSource'];

  constructor(dataSource: CTX['dataSource']) {
    this.dataSource = dataSource;
    this.playerCharacter = new Character({
      name: 'Test Name',
    });
  }

  getPlayerCharacter(): Character {
    return this.playerCharacter;
  }

  async initialLoading() {
    const item = await Item.initByName(this.dataSource, 'padded_mittens');
    await this.playerCharacter.inventory.addItem(item);
  }
}
