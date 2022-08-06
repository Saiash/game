import React, { useState } from 'react';
import { inventory } from '../../models/';

import doll from '../../Assets/doll.png';
import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function Inventory({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [items, setItems] = useState(character.doll.getEquippedItems());

  const unequipItem = (index: number): boolean => {
    const result = gameData.actionResolver.performAction({
      sourceActor: character,
      target: character,
      payload: {
        type: 'unequipItem',
        zoneIndex: index,
      },
    });
    if (result) {
      setItems(character.doll.getEquippedItems());
      stateManager.updateSkills();
    }
    return result;
  };

  const lockItem = (index: number): boolean => {
    const result = gameData.actionResolver.performAction({
      sourceActor: character,
      target: character,
      payload: {
        type: 'lockItem',
        zoneIndex: index,
      },
    });
    stateManager.updateSkills();
    return result;
  };

  return (
    <div>
      {items.map(item => {
        return (
          <div key={item[0]}>
            {!item[1].locked && (
              <button
                onClick={() => {
                  unequipItem(item[0]);
                }}
              >
                U
              </button>
            )}
            {item[1].isLockable() && (
              <button
                onClick={() => {
                  lockItem(item[0]);
                }}
              >
                L
              </button>
            )}
            {item[1].isLocked() && <span>(L) </span>}
            {item[1].getName()}
          </div>
        );
      })}
      <img src={doll} width={128} height={309} alt="doll" />
    </div>
  );
}
