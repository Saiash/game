import React, { useState } from 'react';
import PlayerTabs from './Player/playerTabs';
import PlayerNode from './Player/playerNode';
import Interactions from './Interactions';

import styles from '../../styles/Home.module.css';
import { GameData } from '../../core/engine/gameData';
import { getDataloaders } from '../../core/dataloaders';
import Log from './Log';
import ViewTabs from './View/viewTabs';

import type { CTX } from '../../types/';
import ViewNode from './View/viewNode';

export function Game() {
  const [init, setInit] = useState(0);
  const [settings, setSettings] = useState<{
    ctx: CTX | null;
    textNodeId: string;
    textSceneId: string;
  }>({
    ctx: null,
    textNodeId: '',
    textSceneId: '',
  });
  const [interactionsState, setInteractionsState] = useState(0);
  const [logState, setLogState] = useState(0);
  const [playerState, setPlayerState] = useState(0);
  const [playerTab, setPlayerTab] = useState('items');
  const [viewState, setViewState] = useState(0);
  const [viewTab, setViewTab] = useState('location');

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

  const switchSkillState = () => {
    setInteractionsState(interactionsState ? 0 : 1);
  };
  const switchPlayerState = () => {
    setPlayerState(playerState ? 0 : 1);
  };
  const switchLogState = () => {
    setLogState(logState ? 0 : 1);
  };
  const switchViewState = () => {
    setViewState(viewState ? 0 : 1);
  };

  const stateManager = {
    updateSkills: switchSkillState,
    updatePlayer: switchPlayerState,
    updateLog: switchLogState,
    updateView: switchViewState,
  };

  React.useMemo(async () => {
    const dataloaders = getDataloaders();
    const ctxGetter = function () {
      const ctx: CTX = {
        update: setCtx,
        gameData: {} as GameData,
        language: 'ru',
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
          <PlayerTabs setTab={setPlayerTab} />
          <PlayerNode
            ctx={settings.ctx}
            tab={playerTab}
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
        <div className={styles.viewContainer}>
          <ViewTabs setTab={setViewTab} />
          <ViewNode
            ctx={settings.ctx}
            tab={viewTab}
            viewState={viewState}
            stateManager={stateManager}
          />
        </div>
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
