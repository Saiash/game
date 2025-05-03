import { CTX } from '../../../../../../types';

const arrow_str = (ctx: CTX) => {
  ctx.gameData.getPlayerCharacter().attributeManager.getByCode('int');
};

const arrow_int = (ctx: CTX) => {
  ctx.gameData
    .getPlayerCharacter()
    .disadvantagesManager.add({ name: 'curious', level: 1 });
};

const arrow_dex = (ctx: CTX) => {
  ctx.gameData
    .getPlayerCharacter()
    .disadvantagesManager.add({ name: 'curious', level: 1 });
};

export const node_init_3 = {
  arrows: [
    { nextNodeId: `node_init_4`, conditions: [], onChooseEffect: arrow_int },
    { nextNodeId: `node_init_4`, conditions: [], onChooseEffect: arrow_str },
    { nextNodeId: `node_init_4`, conditions: [], onChooseEffect: arrow_dex },
  ],
};
