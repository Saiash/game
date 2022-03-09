import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Nodes from './components/Node/nodes';

import styles from '../styles/Home.module.css';
import { Context, GameData } from './models';
import type { CTX } from './types/';

export default function Home() {
  const { data } = useSWR('/api/parseData');

  const [ctx, setCtx] = useState<CTX>();
  const [textNodeId, setTextNodeId] = useState<string>('');
  const [textSceneId, setTextSceneId] = useState<string>('');
  const isAdmin = true;

  React.useEffect(() => {
    setCtx({
      context: new Context(data),
      dataSource: { swr: { mutate, useSWR } },
      gameData: new GameData(),
      setTextNodeId,
      setTextSceneId,
    });
    setTextNodeId('nodes_1');
    setTextSceneId('scene_01');
  }, [data]);

  if (!ctx) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.condition}></div>
      <div className={styles.centralBlock}>
        <div className={styles.information}>
          <PlayerNode />
        </div>
        <div className={styles.textNodeContainer}>
          <Nodes ctx={ctx} id={textNodeId} isAdmin={isAdmin} />
        </div>
        <div className={styles.interaction}></div>
      </div>
      <div className={styles.object}></div>
    </div>
  );
}
