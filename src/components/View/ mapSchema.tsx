import React, { useState } from 'react';
import { inventory } from '../../models/';

import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function MapSchema({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [items, setItems] = useState(character.inventory.getAsArray());

  const equipItem = (index: number): boolean => {
    const character = gameData.getPlayerCharacter();
    const result = character.doll.equipFromInventory({ index });
    if (result) {
      setItems(character.inventory.getAsArray());
      stateManager.updateSkills();
      stateManager.updateLog();
    }
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
