import React, { useState } from 'react';
import { inventory } from '../../models/';

import doll from '../../Assets/doll.png';
import type { CTX } from '../../types';
import styles from '../styles/Home.module.css';

export default function Attributes({
  ctx,
  stateManager,
}: {
  ctx: CTX;
  stateManager: { [index: string]: () => void };
}) {
  const { gameData } = ctx;
  const character = gameData.getPlayerCharacter();
  const [attributes, setAttributes] = useState(
    character.attributes.getAsArray()
  );

  return (
    <div>
      {attributes.map(attr => {
        return (
          <div key={attr[0]}>
            {attr[1].getName()}: {attr[1].getRawValue()} +{' '}
            {attr[1].getModsValue()} = {attr[1].getValue()}
          </div>
        );
      })}
    </div>
  );
}
