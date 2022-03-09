import React from 'react';
import { getNodeFragmentsPayload, getTextFragments } from '../utils';
import { EditPanel } from '../editor/EditPanel';

import styles from '../../../styles/Home.module.css';
import type { CTX } from '../../types/';
import { NodeModel } from '../../models/';

export default function Nodes({
  id,
  ctx,
  isAdmin,
}: {
  id: string;
  ctx: CTX;
  isAdmin: boolean;
}) {
  const { context } = ctx;

  const model = context.getModel({ type: 'nodes', id });
  if (!(model instanceof NodeModel)) return <></>;

  const textFragments = getTextFragments({ text: model.getText() });
  const textJSX = getNodeFragmentsPayload({ ctx, textFragments, isAdmin });

  return (
    <>
      <div className={styles.textNode}>
        {isAdmin && <EditPanel model={model} ctx={ctx} />}
        {textJSX}
      </div>
    </>
  );
}
