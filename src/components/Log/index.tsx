import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

import type { CTX } from '../../types';
import LogEvents from './logEvents';
import LogActions from './logActions';

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
  const [actions, setActions] = useState(ctx.gameData.log.getActions());

  useEffect(() => {
    setEvents(ctx.gameData.log.getEvents());
    setActions(ctx.gameData.log.getActions());
  }, [logState]);

  return (
    <div className={styles.logContainer}>
      <LogEvents events={events} ctx={ctx} />
      <LogActions actions={actions} ctx={ctx} stateManager={stateManager}/>
    </div>
  );
}
