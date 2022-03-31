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
      const models = [];
      for (const modelDataKey in data[variant]) {
        const modelData = {
          ...data[variant][modelDataKey],
          id: modelDataKey,
          type: variant,
        };
        const classesList: { [index: string]: any } = modelClasses;
        const nodeModel = new classesList[variant](modelData);
        models.push(nodeModel);
      }
      const dataType = variant as 'nodes' | 'info' | 'actions' | 'events';
      datasources.data[dataType] = [...models];
    }

    this.datasources = datasources;
  }

  getModel = ({
    type,
    id,
  }: {
    type: 'nodes' | 'info' | 'actions' | 'events';
    id: string;
  }): DefaultModel | null => {
    if (!this.datasources?.data) return null;
    const model = this.datasources.data[type].find(model => {
      return model.id === id;
    });
    if (!model) return null;
    return model;
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
