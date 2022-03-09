import React, { useState } from 'react';

import type { CTX } from '../types/';

export default function PlayerNode({
  id,
  ctx,
  isAdmin,
}: {
  id: string;
  ctx: CTX;
  isAdmin: boolean;
}) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();

  return (
    <div>
      <div>
        Items: <span></span>
      </div>
    </div>
  );
}
