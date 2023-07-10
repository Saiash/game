import React, { useState } from 'react';

import type { CTX } from '../../../types';

export default function Location({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const currentLocation = gameData.getPlayerCharacter().location;
  return <div>{currentLocation.getDescription()}</div>;
}
