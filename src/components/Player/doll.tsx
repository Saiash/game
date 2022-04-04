import React, { useState } from 'react';
import { inventory } from '../../models/';

import doll from '../../Assets/doll.png';
import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function Inventory({ ctx }: { ctx: CTX }) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [items, setItems] = useState(character.doll.getEquippedItems());

  const unequipItem = (index: number): boolean => {
    const result = character.doll.uneqipItem({ zoneIndex: index });
    if (result) {
      setItems(character.doll.getEquippedItems());
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
                unequipItem(item[0]);
              }}
            >
              U
            </button>
            {item[1].props.name}
          </div>
        );
      })}
      <img src={doll} width={128} height={309} alt="doll" />
    </div>
  );
}
