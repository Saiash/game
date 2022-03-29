import React, { useState } from 'react';
import { inventory } from '../../models/';

import type { CTX } from '../../types';
import styles from '../../styles/Home.module.css';

export default function Inventory({
  ctx,
  inventory,
}: {
  ctx: CTX;
  inventory: inventory.Inventory;
}) {
  const { gameData } = ctx;
  const items = inventory.getItemsAsArray();

  return (
    <div>
      {items.map((item, index) => {
        return <div key={index}>{item.props.name}</div>;
      })}
    </div>
  );
}
