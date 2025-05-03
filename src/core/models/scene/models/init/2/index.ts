import { CTX } from '../../../../../../types';

const arrow_explorers = (ctx: CTX) => {
  ctx.gameData
    .getPlayerCharacter()
    .disadvantagesManager.add({ name: 'curious', level: 1 });
};

export const node_init_2 = {
  arrows: [
    { nextNodeId: `node_init_3`, conditions: [] },
    {
      nextNodeId: `node_init_3`,
      conditions: [],
      onChooseEffect: arrow_explorers,
    },
  ],
};
