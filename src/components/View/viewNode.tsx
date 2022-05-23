import React, { useState } from 'react';
import Location from './location';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types';
import MapSchema from './ mapSchema';
import Objects from './objects';

export default function ViewNode({
  ctx,
  tab,
  viewState,
  stateManager,
}: {
  ctx: CTX;
  tab: string;
  viewState: number;
  stateManager: { [index: string]: () => void };
}) {
  return (
    <div className={styles.textNode}>
      {tab === 'location' && (
        <span>
          <Location ctx={ctx} stateManager={stateManager} />
        </span>
      )}
      {tab === 'objects' && (
        <span>
          <Objects ctx={ctx} stateManager={stateManager} />
        </span>
      )}
      {tab === 'mapSchema' && (
        <span>
          <MapSchema ctx={ctx} stateManager={stateManager} />
        </span>
      )}
    </div>
  );
}
