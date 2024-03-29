import React, { useState } from 'react';

import styles from '../../../styles/Home.module.css';
import type { CTX } from '../../../types';
import { ACTION_PAYLOAD_TYPE } from '../../../core/engine/constants';
import { skillList } from '../../../core/models/skills';

const TIME_OPTIONS = [0.5, 1, 2, 4, 8, 16, 32];

const TIME_OPTIONS_LABELS = {
  [TIME_OPTIONS[0]]: { label: 'х1/2 времени', value: -1 },
  [TIME_OPTIONS[1]]: { label: 'стандарное время', value: 0 },
  [TIME_OPTIONS[2]]: { label: 'х2 времени', value: 1 },
  [TIME_OPTIONS[3]]: { label: 'х4 времени', value: 2 },
  [TIME_OPTIONS[4]]: { label: 'х8 времени', value: 3 },
  [TIME_OPTIONS[5]]: { label: 'х16 времени', value: 4 },
  [TIME_OPTIONS[6]]: { label: 'х32 времени', value: 5 },
};

export default function Interactions({
  ctx,
  interactionsState,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
  interactionsState: number;
}) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();
  const actions = player.getAvaliableActons();
  const _actions = Object.keys(actions);

  const [skillSelected, setSkillSelected] = useState<any>('acting');
  const [targetSelected, setTargetSelected] = useState(0);
  const [skills, setSkills] = useState(_actions);
  const [targets, setTargets] = useState(actions[skillSelected]);
  const [modOption, setModOption] = useState(0);

  const [option, setOption] = useState(1);

  React.useMemo(async () => {
    setSkills(_actions);
    setSkillSelected(_actions[0]);
    setTargets(actions[_actions[0]]);
  }, [interactionsState]);

  const onSkillSelect = (event: any) => {
    setSkillSelected(event.target.value);
  };

  const onModSelected = (event: any) => {
    setModOption(event.target.value);
  };

  const onTargetSelect = (event: any) => {
    setTargetSelected(event.target.value);
  };

  const handleAction = async () => {
    const result = await gameData.actionResolver.performAction({
      sourceActor: player,
      target: targets[targetSelected].getOwner(),
      payload: {
        type: ACTION_PAYLOAD_TYPE.USE_SKILL,
        skill: skillSelected,
        difficulty: parseInt(targets[targetSelected].getValue()),
        timeMod: modOption,
        onSuccsess: targets[targetSelected].getOnSuccess(),
        onFail: targets[targetSelected].getOnFail(),
      },
    });
    if (result) {
      stateManager.updateSkills();
      stateManager.updatePlayer();
    }
    stateManager.updateLog();
  };

  return (
    <div className={styles.interactionsContainer}>
      <div className={styles.inputContainer}>
        <select onChange={onTargetSelect} value={targetSelected}>
          {targets &&
            targets.map((target, index) => {
              //on what target
              return (
                <option key={index} value={index}>
                  {target.getOwner().getName()}
                </option>
              );
            })}
        </select>
        <br />
        <select onChange={onSkillSelect} value={skillSelected}>
          {skills.map(skill => {
            //what skill
            return (
              <option key={skill} value={skill}>
                {skill}
              </option>
            );
          })}
        </select>
      </div>
      <button className={styles.actionButton} onClick={handleAction}>
        act!
      </button>
      <div className={styles.inputContainer}>
        <select onChange={onModSelected} value={modOption}>
          {Object.values(TIME_OPTIONS_LABELS).map(option => {
            //for how long
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <br />
        <input type="text" />
        {
          //using what object / assistance?
        }
      </div>
    </div>
  );
}
