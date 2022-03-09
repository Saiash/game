import React from 'react';
import { InfoModel } from '../../models/';

import styles from '../../../styles/Home.module.css';

export default function InfoDropdown({ info }: { info: InfoModel }) {
  const description = info.getDescription();
  const name = info.getName();

  return (
    <>
      <div className={styles.infoDropdownPointer}></div>
      <div className={styles.infoDropdown}>
        {name && <div className={styles.infoDropdownHeader}>{name}</div>}
        {description && <div>{description}</div>}
      </div>
    </>
  );
}
