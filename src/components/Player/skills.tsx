import React, { useState } from 'react';
import { inventory } from '../../models/';

import doll from '../../Assets/doll.png';
import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function Skills({ ctx }: { ctx: CTX }) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [skills, setSkills] = useState(character.skills.getAsArray());

  return (
    <div>
      {skills.map(skill => {
        return (
          <div key={skill[0]}>
            {skill[0]}: {skill[1].getRawValue()} + {skill[1].getExpMod()} ={' '}
            {skill[1].getEffectiveValue()}
          </div>
        );
      })}
    </div>
  );
}
