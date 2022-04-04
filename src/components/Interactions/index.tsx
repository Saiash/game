import React, { useState } from 'react';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types';

export default function Interactions({ ctx }: { ctx: CTX }) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();

  return (
    <div className={styles.interactionsContainer}>
      <div className={styles.inputContainer}>
        <input type="text" />
        <br />
        <input type="text" />
      </div>
      <button className={styles.actionButton}>Ok</button>
      <div className={styles.inputContainer}>
        <input type="text" />
        <br />
        <input type="text" />
      </div>
    </div>
  );
}
