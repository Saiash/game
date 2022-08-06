import React, { useState } from 'react';
import { inventory } from '../../models/';

import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function Objects({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const currentLocation = gameData.playerCharacter.location;
  return (
    <div>
      {currentLocation.getObjects().map(obj => {
        return <div key={obj.getId()}>{obj.getName()}</div>;
      })}
    </div>
  );
}
