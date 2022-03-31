import React, { useState } from 'react';
import Inventory from './inventory';

import doll from '../../Assets/doll.png';
import Image from 'next/image';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types';

export default function PlayerNode({ ctx, tab }: { ctx: CTX; tab: string }) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();

  return (
    <div className={styles.textNode}>
      {tab === 'items' && (
        <span>
          <Inventory ctx={ctx} inventory={player.inventory} />
        </span>
      )}
      {tab === 'skills' && (
        <span>
          Skills: <span>{JSON.stringify(player.skills.collection)}</span>
        </span>
      )}
      {tab === 'attrs' && (
        <span>
          Attrs: <span>{JSON.stringify(player.attributes.collection)}</span>
        </span>
      )}
      {tab === 'doll' && (
        <span>
          <Image src={doll} width={128} height={309} alt="doll" />
        </span>
      )}
    </div>
  );
}
