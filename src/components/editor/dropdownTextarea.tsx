import React, { useState } from 'react';
import type { DefaultModel } from '../../models/';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types/';

export function DropdownTextarea({
  model,
  ctx,
}: {
  model: DefaultModel;
  ctx: CTX;
}) {
  //const description = model.getDescription();
  //const name = model.getName();
  const [text, setText] = useState<string>(model.getText());

  const handleChage = (event:any) => {
    const newValue = event.target.value;
    setText(newValue);
    model.setText(newValue);
  };

  return (
    <>
      <div className={styles.dropdownPointer}></div>
      <div className={styles.dropdown}>
        {text && (
          <textarea
            onChange={handleChage}
            value={text}
            className={styles.editArea}
          />
        )}
      </div>
    </>
  );
}
