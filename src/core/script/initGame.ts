import { ACTION_PAYLOAD_TYPE } from '../engine/constants';
import { GameData } from '../engine/gameData';
import { Entity } from '../engine/models/entity/entity';
import { Character } from '../models/characters';
import { Item } from '../models/items/item';
import { ItemManager } from '../models/items/manager';
import { Weapon } from '../models/items/weapon';

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
  // await characters[1].skillManager.add({
  //   name: 'broadsword',
  //   exp: 12,
  // });
  const sword = ItemManager.createItemByCode('katana', gameData.ctx, ['good']);
  characters[1].doll.equipItem({ item: sword, performer: characters[1] });

  const axe = ItemManager.createItemByCode('axe', gameData.ctx, ['good']);
  const armor = ItemManager.createItemByCode(
    'layredClothLightbodyArmor',
    gameData.ctx
  );
  const dress = ItemManager.createItemByCode(
    'clothordinary1hoodedDress',
    gameData.ctx
  );
  gameData
    .getPlayerCharacter()
    .doll.equipItem({ item: axe, performer: gameData.getPlayerCharacter() });
  gameData
    .getPlayerCharacter()
    .doll.equipItem({ item: armor, performer: gameData.getPlayerCharacter() });
  gameData.getPlayerCharacter().inventory.add(dress);
  gameData.getPlayerCharacter().skillManager.getByCode('accounting');

  //gameData.battleEngine.initBattle(characters);
  //const attack = gameData.battleEngine.performAction({
  // gameData.battleEngine.performAction({
  //   actorId: gameData.getPlayerCharacter().getId(),
  //   maneur: 'totalAttack',
  //   otherOptions: {
  //     changePoseDirection: 'down',
  //   },
  //   attackOptions: {
  //     hand: 'right',
  //     setIndex: 0,
  //     attackType: 'melee',
  //     target: characters[1].getId(),
  //     zone: 'torso',
  //     options: {
  //       type: 'feint',
  //     },
  //   },
  // });
  // if (attack) {
  //   gameData.battleEngine.performAction({
  //     actorId: gameData.getPlayerCharacter().getId(),
  //     maneur: 'defence',
  //     defenceOptions: {
  //       type: 'dodge',
  //       retreat: true,
  //       damagePayload: attack,
  //     },
  //   });
  // }

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
  await gameData.sceneEngine.initNode('node_init_1');
  await gameData.sceneEngine.forwardByArrow(0);
  await gameData.sceneEngine.forwardByArrow(1);
  console.log(gameData.getPlayerCharacter().getDataToSave());
  // const text = JSON.stringify(
  //   characters[0].skillManager.check({
  //     code: 'lockpicking',
  //     difficulty: 12,
  //     timeMod: 0,
  //   })
  // );
  // gameData.log.addEvent({ text });
  // gameData.log.addEvent({
  //   text: gameData
  //     .getPlayerCharacter()
  //     .perkManager.getAsArray()
  //     .map(p => {
  //       return p[0];
  //     })
  //     .join(', '),
  // });
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
  gameData.setPlayerCharacter(player);
  // await player.skillManager.add({
  //   name: 'lockpicking',
  //   exp: 1,
  // });
  // await player.skillManager.add({
  //   name: 'thaumatology',
  //   exp: 1,
  // });
  // await player.skillManager.add({
  //   name: 'axeMace',
  //   exp: 12,
  // });
  // await player.perkManager.add({
  //   name: 'magery',
  //   level: 4,
  // });
  // const skillcheck = await player.skillManager.resolve({
  //   payload: {
  //     type: ACTION_PAYLOAD_TYPE.USE_SKILL,
  //     difficulty: 12,
  //     timeMod: 0,
  //     skill: 'thaumatology',
  //   },
  // });
  return player;
}
