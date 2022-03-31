import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Nodes from './components/Node/nodes';
import PlayerTabs from './components/Player/playerTabs';
import PlayerNode from './components/Player/playerNode';
import { callAPIEndpoint } from './utils';

import styles from './styles/Home.module.css';
import { Context, GameData, getDataloaders } from './models';
import type { CTX } from './types/';

function App() {
  const [init, setInit] = useState(1);
  const [settings, setSettings] = useState<{
    ctx: CTX | null;
    initLoading: boolean;
    tab: string;
    textNodeId: string;
    textSceneId: string;
  }>({
    ctx: null,
    initLoading: false,
    tab: 'items',
    textNodeId: '',
    textSceneId: '',
  });

  const isAdmin = true;

  const setCtx = (ctx: CTX) => {
    setSettings({ ...settings, ctx });
  };

  const setTextNodeId = (textNodeId: string) => {
    setSettings({ ...settings, textNodeId });
  };

  const setTextSceneId = (textSceneId: string) => {
    setSettings({ ...settings, textSceneId });
  };

  const setTab = (tab: string) => {
    setSettings({ ...settings, tab });
  };

  React.useMemo(async () => {
    const dataloaders = getDataloaders();
    const dataSource = { swr: { mutate, useSWR }, dataloaders };
    const data = await callAPIEndpoint({
      endpoint: 'parseData',
      data: {test: '1'}
    });
    setSettings({
      ctx: {
        update: setCtx,
        context: new Context(data),
        dataSource,
        gameData: new GameData(dataSource),
        setTextNodeId,
        setTextSceneId,
      },
      initLoading: false,
      tab: 'items',
      textNodeId: 'nodes_1',
      textSceneId: 'scene_01',
    });
  }, [init]);

  React.useMemo(async () => {
    if (settings.ctx && !settings.initLoading) {
      const newCtx = { ...settings.ctx };
      await newCtx.gameData?.initialLoading();
      setSettings({ ...settings, ctx: newCtx, initLoading: true });
    }
  }, [settings.ctx]);

  if (!settings.ctx) return <>empty page</>;

  return (
    <div className={styles.container}>
      <div className={styles.settings}></div>
      <div className={styles.content}>
        <div className={styles.playerContainer}>
          <PlayerTabs setTab={setTab} />
          <PlayerNode ctx={settings.ctx} tab={settings.tab} />
        </div>
        <div className={styles.textContainer}>
          <Nodes
            ctx={settings.ctx}
            id={settings.textNodeId}
            isAdmin={isAdmin}
          />
        </div>
        <div className={styles.viewContainer}></div>
      </div>
      <div className={styles.interactions}></div>
    </div>
  );
}

export default App;
