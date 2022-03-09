import React from 'react';
import { getNodeFragmentsPayload, getTextFragments } from '../utils';
import { ActionModel } from '../../models/';
import { EditPanel } from '../editor/EditPanel';

import styles from '../../../styles/Home.module.css';
import type { CTX } from '../../types/';

export default function Action({
  id,
  ctx,
  isAdmin,
}: {
  id: string;
  ctx: CTX;
  isAdmin: boolean;
}) {
  const { context } = ctx;

  const model = context.getModel({ type: 'actions', id });
  if (!(model instanceof ActionModel)) return <></>;

  const textFragments = getTextFragments({ text: model.getText() });
  const textJSX = getNodeFragmentsPayload({ ctx, textFragments, isAdmin });

  const action = model.getAction();

  const handleAction = () => {
    if (!action) return;
    switch (action.type) {
      case 'selectNode':
        ctx.setTextNodeId(action.value);
        break;
      case 'selectScene':
        ctx.setTextSceneId(action.value);
        break;
    }
  };

  return (
    <>
      <div className={styles.action}>
        {isAdmin && <EditPanel model={model} ctx={ctx} />}
        <span onClick={handleAction}>{textJSX}</span>
      </div>
    </>
  );
}
