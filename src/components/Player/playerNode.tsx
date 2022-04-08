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
  skillState,
}: {
  ctx: CTX;
  tab: string;
  skillState: () => void;
}) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();

  return (
    <div className={styles.textNode}>
      {tab === 'items' && (
        <span>
          <Inventory ctx={ctx} skillState={skillState} />
        </span>
      )}
      {tab === 'skills' && (
        <span>
          <Skills ctx={ctx} />
        </span>
      )}
      {tab === 'attrs' && (
        <span>
          <Attributes ctx={ctx} />
        </span>
      )}
      {tab === 'doll' && (
        <span>
          <Doll ctx={ctx} skillState={skillState} />
        </span>
      )}
    </div>
  );
}
