import React, { useState } from 'react';
import { inventory } from '../../models/';

import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function MapSchema({
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
      {currentLocation.getConnections().map(location => {
        return <div key={location}>{location}</div>;
      })}
    </div>
  );
}
