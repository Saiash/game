import React, { useState } from 'react';

import type { CTX } from '../../../types';

export default function Skills({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [skills, setSkills] = useState(character.skillManager.getAsArray());

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
