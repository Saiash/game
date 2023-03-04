import React, { useState } from 'react';

import type { CTX } from '../../types';

export default function Inventory({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [items, setItems] = useState(character.inventory.getAsArray());

  const equipItem = async (index: number): Promise<boolean> => {
    const character = gameData.getPlayerCharacter();
    const result = await gameData.actionResolver.performAction({
      sourceActor: character,
      target: character,
      payload: {
        type: 'equipItem',
        itemIndex: index,
      },
    });
    if (result) {
      setItems(character.inventory.getAsArray());
      stateManager.updateSkills();
      stateManager.updateLog();
    }
    stateManager.updateLog();
    return result;
  };

  return (
    <div>
      {items.map(item => {
        return (
          <div key={item[0]}>
            <button
              onClick={() => {
                equipItem(item[0]);
              }}
            >
              E
            </button>
            {item[1].getName()}
          </div>
        );
      })}
    </div>
  );
}
