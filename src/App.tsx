import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Nodes from './components/Node/nodes';
import PlayerTabs from './components/Player/playerTabs';
import PlayerNode from './components/Player/playerNode';
import Interactions from './components/Interactions';
import { callAPIEndpoint } from './utils';

import styles from './styles/Home.module.css';
import { Context, GameData, getDataloaders } from './models';
import type { CTX } from './types/';

function App() {
  let test = 0;
  const [init, setInit] = useState(0);
  const [settings, setSettings] = useState<{
    ctx: CTX | null;
    tab: string;
    textNodeId: string;
    textSceneId: string;
  }>({
    ctx: null,
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
    const data = await callAPIEndpoint({
      endpoint: 'parseData',
      data: { test: '1' },
    });
    const ctx = {
      update: setCtx,
      context: new Context(data),
      dataloaders,
      gameData: new GameData(dataloaders),
      setTextNodeId,
      setTextSceneId,
    };
    const settings = {
      ctx,
      tab: 'items',
      textNodeId: 'nodes_1',
      textSceneId: 'scene_01',
    };
    const newCtx = { ...settings.ctx };
    await newCtx.gameData?.initialLoading();
    setSettings({ ...settings, ctx: newCtx });
  }, [init]);

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
      <div className={styles.interactions}>
        <Interactions ctx={settings.ctx} />
      </div>
    </div>
  );
}

export default App;
