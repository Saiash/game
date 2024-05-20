import { ACTION_PAYLOAD_TYPE } from '../engine/constants';
import { GameData } from '../engine/gameData';
import { Character } from '../models/characters';
import { Item } from '../models/items/item';
import { ItemManager } from '../models/items/manager';

export async function initGame(gameData: GameData) {
  gameData.addLocation({
    name: 'defaultLocation',
    description: 'defaultLocation',
    code: 'defaultLocation',
    connections: [],
  });
  const [characters] = await Promise.all([
    //await initItems(gameData),
    await initCharacters(gameData),
  ]);

  const axe = ItemManager.createItemByCode('axe', gameData.ctx, ['cheap']);
  gameData.getPlayerCharacter().inventory.add(axe);

  // for (const item of items) {
  //   gameData.getPlayerCharacter().inventory.add(item);
  // }
  // await this.playerCharacter.lore.add({
  //   dataloaders: this.dataloaders,
  //   name: 'lore_1',
  // });
  await gameData.addObject({
    name: 'chest_test',
    location: gameData.locations.defaultLocation,
  });
  await gameData.addObject({
    name: 'chest_test_2',
    location: gameData.locations.defaultLocation,
  });
  await gameData.sceneEngine.initScene('scene_1');
  const text = JSON.stringify(
    characters[0].skillManager.check({
      code: 'lockpicking',
      difficulty: 12,
      timeMod: 0,
    })
  );
  gameData.log.addEvent({ text });
  gameData.log.addEvent({
    text: gameData
      .getPlayerCharacter()
      .perkManager.getAsArray()
      .map(p => {
        return p[0];
      })
      .join(', '),
  });

  console.log('test');
}

async function initItems(gameData: GameData): Promise<Item[]> {
  return [
    await Item.initByName({
      ctx: gameData.ctx,
      dataloaders: gameData.dataloaders,
      name: 'padded_mittens',
    }),
    await Item.initByName({
      ctx: gameData.ctx,
      dataloaders: gameData.dataloaders,
      name: 'leather_gloves',
    }),
    await Item.initByName({
      ctx: gameData.ctx,
      dataloaders: gameData.dataloaders,
      name: 'hand_cuffs',
    }),
    await Item.initByName({
      ctx: gameData.ctx,
      dataloaders: gameData.dataloaders,
      name: 'knife',
    }),
  ];
}

async function initCharacters(gameData: GameData): Promise<Character[]> {
  const playerCharacter = await initPlayerCharacter(gameData);
  return [
    playerCharacter,
    gameData.addCharacter(
      'Male_Character',
      gameData.getLocation('defaultLocation')
    ),
  ];
}

async function initPlayerCharacter(gameData: GameData): Promise<Character> {
  const player = await gameData.addCharacter(
    'Female_Character',
    gameData.getLocation('defaultLocation')
  );
  await player.skillManager.add({
    name: 'lockpicking',
    exp: 1,
  });
  await player.skillManager.add({
    name: 'thaumatology',
    exp: 1,
  });
  await player.perkManager.add({
    name: 'magery',
    level: 4,
  });
  const skillcheck = await player.skillManager.resolve({
    payload: {
      type: ACTION_PAYLOAD_TYPE.USE_SKILL,
      difficulty: 12,
      timeMod: 0,
      skill: 'thaumatology',
    },
  });
  return player;
}
