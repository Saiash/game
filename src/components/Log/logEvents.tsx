import React, { useState, useEffect } from 'react';
import { Character } from '../../core/models/characters';
import styles from '../../styles/Home.module.css';

import type { CTX } from '../../types';
import { LogEvent } from '../../core/engine/gameData/Log';

export default function LogEvents({
  ctx,
  events,
}: {
  ctx: CTX;
  events: LogEvent[];
}) {
  const player = ctx.gameData.getPlayerCharacter();

  return (
    <div>
      {events.map(event => {
        let type: string = '';
        if (event.source instanceof Character) {
          const id = event.source.id;
          type =
            event.source.id === player.id
              ? 'playerCharacterEvent'
              : 'otherCharacterEvent';
        } else {
          type = 'systemEvent';
        }
        return (
          <div className={(styles.eventMessage, styles[type])} key={event.id}>
            {event.time}: {event.text}
          </div>
        );
      })}
    </div>
  );
}
