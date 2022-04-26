import React, { useState } from 'react';
import Nodes from './components/Node/nodes';
import PlayerTabs from './components/Player/playerTabs';
import PlayerNode from './components/Player/playerNode';
import Interactions from './components/Interactions';
import { callAPIEndpoint } from './utils';

import styles from './styles/Home.module.css';
import { Context, GameData, getDataloaders } from './models';
import type { CTX } from './types/';
import Log from './components/Log';

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
  const [interactionsState, setInteractionsState] = useState(0);
  const [logState, setLogState] = useState(0);
  const [playerState, setPlayerState] = useState(0);

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

  const switchSkillState = () => {
    setInteractionsState(interactionsState ? 0 : 1);
  };
  const switchPlayerState = () => {
    setPlayerState(playerState ? 0 : 1);
  };
  const switchLogState = () => {
    setLogState(logState ? 0 : 1);
  };

  const stateManager = {
    updateSkills: switchSkillState,
    updatePlayer: switchPlayerState,
    updateLog: switchLogState,
  };

  React.useMemo(async () => {
    const dataloaders = getDataloaders();
    const data = await callAPIEndpoint({
      endpoint: 'parseData',
      data: { test: '1' },
    });
    const ctxGetter = function () {
      const ctx: CTX = {
        update: setCtx,
        context: new Context(data),
        gameData: {} as GameData,
        dataloaders,
        setTextNodeId,
        setTextSceneId,
      };
      ctx.gameData = new GameData({ ctx, dataloaders });
      return ctx;
    };
    const ctx = ctxGetter();
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
          <PlayerNode
            ctx={settings.ctx}
            tab={settings.tab}
            playerState={playerState}
            stateManager={stateManager}
          />
        </div>
        <div className={styles.textContainer}>
          <Log
            ctx={settings.ctx}
            logState={logState}
            stateManager={stateManager}
          />
        </div>
        <div className={styles.viewContainer}></div>
      </div>
      <div className={styles.interactions}>
        <Interactions
          ctx={settings.ctx}
          stateManager={stateManager}
          interactionsState={interactionsState}
        />
      </div>
    </div>
  );
}

export default App;
