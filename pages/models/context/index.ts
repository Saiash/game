import { modelClasses } from './types';

import type { DefaultModel } from './model';
import type { dataSource } from './types';

export class Context {
  datasources?: dataSource = undefined;

  constructor(data: any) {
    this.buildFromRawData(data);
  }

  buildFromRawData(data: any) {
    if (!data) {
      this.datasources = { data };
      return;
    }

    const datasources: dataSource = {
      data: { nodes: [], actions: [], info: [], events: [] },
    };
    const modelVariants = ['nodes', 'info', 'actions', 'events'];

    for (const variant of modelVariants) {
      const models: DefaultModel[] = [];
      for (const modelDataKey in data[variant]) {
        const modelData = {
          ...data[variant][modelDataKey],
          id: modelDataKey,
          type: variant,
        };
        const nodeModel: DefaultModel = new modelClasses[variant](modelData);
        models.push(nodeModel);
      }
      datasources.data[variant] = [...models];
    }

    this.datasources = datasources;
  }

  getModel = ({
    type,
    id,
  }: {
    type: string;
    id: string;
  }): DefaultModel | null => {
    if (!this.datasources?.data) return null;
    return this.datasources.data[type].find(model => {
      return model.id === id;
    });
  };

  setModel = ({
    type,
    id,
    data,
  }: {
    type: string;
    id: string;
    data: any;
  }): DefaultModel | null => {
    if (!this.datasources?.data) return null;
    /*const node = this.datasources.data[type].find(model => {
      return model.id === id;
    });
    const modelData = {
      ...data,
      id,
      type,
    };
    const nodeModel: DefaultModel = new modelClasses[type](modelData);*/
    return null;
  };
}
