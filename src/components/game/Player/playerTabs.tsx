import React, { useState } from 'react';

import type { CTX } from '../../../types/';
import styles from '../../../styles/Home.module.css';

export default function playerTabs({
  setTab,
}: {
  setTab: (type: string) => any;
}) {
  return (
    <div className={styles.playerTabs}>
      <button
        onClick={() => {
          setTab('items');
        }}
      >
        Inv
      </button>
      <button
        onClick={() => {
          setTab('skills');
        }}
      >
        Skills
      </button>
      <button
        onClick={() => {
          setTab('attrs');
        }}
      >
        attrs
      </button>
      <button
        onClick={() => {
          setTab('doll');
        }}
      >
        doll
      </button>
    </div>
  );
}
