/*import React, { useState } from 'react';
import useSWR from 'swr';

import type { CTX } from '../types/';
import { Context } from '../models';

import styles from '../../styles/Home.module.css';
import { stringify } from 'querystring';*/

export default function Home() {
  /*const { data } = useSWR('/api/parseData');

  const [ctx, setCtx] = useState<CTX>();
  const [selectedObject, setSelectedObject] =
    useState<{ type: string; data: any }>();

  const [textNodeId, setTextNodeId] = useState<string>('');
  const [textSceneId, setTextSceneId] = useState<string>('');

  React.useEffect(() => {
    setCtx({
      context: new Context(data),
      setTextNodeId,
      setTextSceneId,
    });
    setTextNodeId('nodes_1');
    setTextSceneId('scene_01');
  }, [data]);

  if (!ctx) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.textNodeContainer}></div>
    </div>
  );*/
}
