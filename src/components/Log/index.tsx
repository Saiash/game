import React, { useState, useEffect } from 'react';
import { Character } from '../../models/characters';
import { Item } from '../../models/characters/inventory/item';
import styles from '../../styles/Home.module.css';

import type { CTX } from '../../types';

export default function Log({
  ctx,
  logState,
  stateManager,
}: {
  ctx: CTX;
  logState: number;
  stateManager: { [index: string]: () => void };
}) {
  const [events, setEvents] = useState(ctx.gameData.log.getEvents());
  const player = ctx.gameData.getPlayerCharacter();

  useEffect(() => {
    setEvents(ctx.gameData.log.getEvents());
  }, [logState]);

  return (
    <div className={styles.logContainer}>
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
          <div className={(styles.eventMessage, styles[type])}>
            {event.text}
          </div>
        );
      })}
    </div>
  );
}
