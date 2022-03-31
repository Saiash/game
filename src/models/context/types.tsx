import { NodeModel, InfoModel, ActionModel } from '../';

export type dataSource = {
  data: {
    nodes: NodeModel[];
    actions: ActionModel[];
    info: InfoModel[];
    events: NodeModel[];
  };
};

export const modelClasses = {
  nodes: NodeModel,
  info: InfoModel,
  actions: ActionModel,
  events: NodeModel,
};
