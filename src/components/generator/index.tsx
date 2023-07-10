import React, { useState } from 'react';
import { Content } from './components/content';
import { Log } from './components/log';

export function Generator() {
  const [log, setLog] = useState<string[]>([]);
  const addToLog = (entity: string) => {
    setLog([...log, entity]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Content addToLog={addToLog}></Content>
      <Log log={log}></Log>
    </div>
  );
}
