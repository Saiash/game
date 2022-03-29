import { DefaultModel } from '../';

export class NodeModel extends DefaultModel {
  text?: string;
  type: string;

  constructor(data) {
    super({ id: data.id });
    this.text = data.text;
    this.type = 'nodes';
  }

  setText = (text: string): boolean => {
    this.text = text;
    return true;
  };

  getText = (): string => {
    return this.text || '';
  };

  save = (): boolean => {
    return true;
  };

  getRaw = (): string => {
    return JSON.stringify(this);
  };
}
