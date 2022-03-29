import { DefaultModel } from '../../';

type Action = {
  type: string;
  value: string;
};

export class ActionModel extends DefaultModel {
  type: string;
  text?: string;
  action?: Action;

  constructor(data) {
    super({ id: data.id });
    this.text = data.text;
    this.action = { type: data.actionType, value: data.actionValue };
    this.type = 'actions';
  }

  setText = (text: string): boolean => {
    this.text = text;
    return true;
  };

  getText = (): string => {
    return this.text || '';
  };

  getAction = (): Action | null => {
    return this.action || null;
  };

  save = (): boolean => {
    return true;
  };
}
