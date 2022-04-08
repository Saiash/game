import React, { useState } from 'react';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types';

export default function Interactions({
  ctx,
  skillState,
}: {
  ctx: CTX;
  skillState: number;
}) {
  const { gameData } = ctx;
  const player = gameData.getPlayerCharacter();
  const actions = player.getAvaliableActons();
  const _skills = Object.keys(actions);

  const [skillSelected, setSkillSelected] = useState('');
  const [skills, setSkills] = useState(_skills);
  const [targets, setTargets] = useState(actions[skillSelected]);
  const [targetSelected, setTargetSelected] = useState('');

  const onSkillSelect = (event: any) => {
    setSkillSelected(event.target.value);
  };

  const onTargetSelect = (event: any) => {
    setTargetSelected(event.target.value);
  };

  return (
    <div className={styles.interactionsContainer}>
      <div className={styles.inputContainer}>
        <select onChange={onSkillSelect} value={skillSelected}>
          {skills.map(skill => {
            return <option value={skill}>{skill}</option>;
          })}
        </select>
        <br />
        <select onChange={onTargetSelect} value={targetSelected}>
          {targets &&
            targets.map(target => {
              return (
                <option value={target.source.getName()}>
                  {target.source.getName()}
                </option>
              );
            })}
        </select>
      </div>
      <button className={styles.actionButton}>Ok</button>
      <div className={styles.inputContainer}>
        <input type="text" />
        <br />
        <input type="text" />
      </div>
    </div>
  );
}
