import React, { useState } from 'react';

import doll from '../../../Assets/doll.png';
import type { CTX } from '../../../types';
import { ACTION_PAYLOAD_TYPE } from '../../../core/engine/constants';
import { Item } from '../../../core/models/items/item';

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

  const unequipItem = async (item: Item): Promise<boolean> => {
    const result = await gameData.actionResolver.performAction({
      sourceActor: character,
      target: character,
      payload: {
        type: ACTION_PAYLOAD_TYPE.UNEQUIP_ITEM,
        itemId: item.getId(),
      },
    });
    if (result) {
      setItems(character.doll.getEquippedItems());
      stateManager.updateSkills();
    }
    return result;
  };

  const lockItem = async (item: Item): Promise<boolean> => {
    const result = await gameData.actionResolver.performAction({
      sourceActor: character,
      target: character,
      payload: {
        type: ACTION_PAYLOAD_TYPE.LOCK_ITEM,
        itemId: item.getId(),
      },
    });
    stateManager.updateSkills();
    return result;
  };

  return (
    <div>
      {Object.keys(items).map(itemId => {
        const item = items[itemId as unknown as number];
        return (
          <div key={item.getId()}>
            {!item.locked && (
              <button
                onClick={() => {
                  unequipItem(item);
                }}
              >
                U
              </button>
            )}
            {item.isLockable() && (
              <button
                onClick={() => {
                  lockItem(item);
                }}
              >
                L
              </button>
            )}
            {item.isLocked() && <span>(L) </span>}
            {item.getName()}
          </div>
        );
      })}
      <img src={doll} width={128} height={309} alt="doll" />
    </div>
  );
}
