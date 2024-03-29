import React, { useState } from 'react';
import { ObjectModel } from '../../../core/models/locations/object';

import type { CTX } from '../../../types';
import styles from '../../../styles/Home.module.css';

export default function Objects({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const [currentTarget, setCurrentTarget] = useState(
    gameData.getPlayerTarget()
  );
  const currentLocation = gameData.getPlayerCharacter().getLocation();

  const handleObjectClick = (obj: ObjectModel) => {
    gameData.selectTarget(obj);
    setCurrentTarget(gameData.getPlayerTarget());
    stateManager.updateSkills();
  };

  return (
    <div>
      {currentLocation.getObjects().map(obj => {
        return (
          <div
            className={
              currentTarget?.getId() === obj.getId()
                ? styles.interactionObject_active
                : styles.interactionObject
            }
            key={obj.getId()}
            onClick={() => {
              handleObjectClick(obj);
            }}
          >
            {obj.getName()}
          </div>
        );
      })}
    </div>
  );
}
