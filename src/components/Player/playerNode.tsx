import React, { useState } from 'react';
import Inventory from './inventory';
import Skills from './skills';
import Attributes from './attributes';
import Doll from './doll';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types';

export default function PlayerNode({
  ctx,
  tab,
  playerState,
  stateManager,
}: {
  ctx: CTX;
  tab: string;
  playerState: number;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();

  return (
    <div className={styles.textNode}>
      {tab === 'items' && (
        <span>
          <Inventory ctx={ctx} stateManager={stateManager} />
        </span>
      )}
      {tab === 'skills' && (
        <span>
          <Skills ctx={ctx} stateManager={stateManager} />
        </span>
      )}
      {tab === 'attrs' && (
        <span>
          <Attributes ctx={ctx} stateManager={stateManager} />
        </span>
      )}
      {tab === 'doll' && (
        <span>
          <Doll ctx={ctx} stateManager={stateManager} />
        </span>
      )}
    </div>
  );
}
