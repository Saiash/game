import { ACTION_PAYLOAD_TYPE } from '../engine/constants';
import { GameData } from '../engine/gameData';
import { Character } from '../models/characters';
import { Item } from '../models/characters/inventory/item';

export async function initGame(gameData: GameData) {
  gameData.addLocation({
    name: 'defaultLocation',
    description: 'defaultLocation',
    code: 'defaultLocation',
    connections: [],
  });
  const [items, characters] = await Promise.all([
    await initItems(gameData),
    await initCharacters(gameData),
  ]);
  gameData.setPlayerCharacter(characters[0]);
  for (const item of items) {
    await gameData.getPlayerCharacter().inventory.add(item);
  }
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

  const result = await gameData.actionResolver.performAction({
    sourceActor: gameData.getPlayerCharacter(),
    target: characters[1],
    payload: {
      type: ACTION_PAYLOAD_TYPE.USE_PERK,
      perk: 'fashion',
    },
  });
  const result2 = await gameData.actionResolver.performAction({
    sourceActor: gameData.getPlayerCharacter(),
    target: gameData.getPlayerCharacter(),
    payload: {
      type: ACTION_PAYLOAD_TYPE.USE_PERK,
      perk: 'fashion',
    },
  });
  console.log('test');
  // gameData.getPlayerCharacter().skillManager.useOn({
  //   code: 'lockpicking',
  //   target: gameData.locations.defaultLocation.getObjects()[0],
  // });
  // gameData.getPlayerCharacter()..useOn({
  //   code: 'look',
  //   target: gameData.locations.defaultLocation.getObjects()[0],
  // });
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
    dataloaders: gameData.dataloaders,
    name: 'lockpicking',
    exp: 1,
  });
  await player.perkManager.add({
    dataloaders: gameData.dataloaders,
    name: 'fashion',
  });
  return player;
}
