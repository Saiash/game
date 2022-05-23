import React, { useState } from 'react';

import type { CTX } from '../../types/';
import styles from '../../styles/Home.module.css';

export default function ViewTabs({
  setTab,
}: {
  setTab: (type: string) => any;
}) {
  return (
    <div className={styles.playerTabs}>
      <button
        onClick={() => {
          setTab('location');
        }}
      >
        Локация
      </button>
      <button
        onClick={() => {
          setTab('objects');
        }}
      >
        Объекты + персонажи
      </button>
      <button
        onClick={() => {
          setTab('mapSchema');
        }}
      >
        Перемещение
      </button>
    </div>
  );
}
