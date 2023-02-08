import React, { useState, useEffect } from 'react';
import { Character } from '../../models/characters';
import styles from '../../styles/Home.module.css';

import type { CTX } from '../../types';
import { LogEvent } from '../../models/gameData/Log';

export default function LogActions({
  ctx,
  actions,
  stateManager
}: {
  ctx: CTX;
  actions: LogEvent[];
  stateManager: { [index: string]: () => void };
}) {
  const handleClick = async (index: number) => {
    await ctx.gameData.sceneEngine.executeAction(index);
    stateManager.updateLog();
  }

  return (
    <div>
      {actions.map((action, index) => {
        return (
          <div className={(styles.eventMessage, styles['logAction'])} key={index} onClick={() => {handleClick(index)}}>
            {action.text}
          </div>
        );
      })}
    </div>
  );
}
