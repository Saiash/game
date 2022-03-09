import React, { useState } from 'react';
import { getNodeFragmentsPayload, getTextFragments } from '../utils';
import InfoDropdown from './infoDropdown';
import { InfoModel } from '../../models/';
import { EditPanel } from '../editor/EditPanel';

import styles from '../../../styles/Home.module.css';
import type { CTX } from '../../types/';

export default function Info({
  id,
  ctx,
  isAdmin,
}: {
  id: string;
  ctx: CTX;
  isAdmin: boolean;
}) {
  const { context } = ctx;
  const [infoShown, setinfoShown] = useState<boolean>(false);

  const model = context.getModel({ type: 'info', id });
  if (!(model instanceof InfoModel)) return <></>;

  const textFragments = getTextFragments({ text: model.getText() });
  const textJSX = getNodeFragmentsPayload({ ctx, textFragments, isAdmin });

  const handleHover = () => {
    setinfoShown(true);
  };

  const handleHoverOut = () => {
    setinfoShown(false);
  };

  return (
    <div className={styles.info}>
      {isAdmin && <EditPanel model={model} ctx={ctx} />}
      <span onMouseEnter={handleHover} onMouseLeave={handleHoverOut}>
        {textJSX}
        {infoShown && <InfoDropdown info={model} />}
      </span>
    </div>
  );
}
