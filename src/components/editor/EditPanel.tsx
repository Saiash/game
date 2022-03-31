import React, { useState } from 'react';
import { DropdownTextarea } from './dropdownTextarea';
import { callAPIEndpoint } from '../../utils';

import styles from '../../styles/Home.module.css';
import type { CTX } from '../../types/';
import type { DefaultModel } from '../../models/';

export function EditPanel({ model, ctx }: { model: DefaultModel; ctx: CTX }) {
  const [areaShown, setAreaShown] = useState<boolean>(false);

  const handleEdit = async () => {
    areaShown ? setAreaShown(false) : setAreaShown(true);
  };

  const handleSave = async () => {
    model.save();
    setAreaShown(false);
    const savedData = await callAPIEndpoint({
      endpoint: 'saveData',
      data: model.getRaw(),
    });
    ctx.context.setModel({
      type: savedData.type,
      id: savedData.data.id,
      data: savedData.data,
    });
  };

  return (
    <>
      <div className={styles.editPanel}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleSave}>Save</button>
        {areaShown && <DropdownTextarea model={model} ctx={ctx} />}
      </div>
    </>
  );
}
