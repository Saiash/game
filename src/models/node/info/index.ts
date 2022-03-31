import { DefaultModel } from '../../';

export class InfoModel extends DefaultModel {
  text?: string;
  name?: string;
  description?: string;
  image?: string;
  type: string;

  constructor(data: any) {
    super({ id: data.id });
    this.text = data.text;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.type = 'info';
  }

  setText = (text: string): boolean => {
    this.text = text;
    return true;
  };

  getText = (): string => {
    return this.text || '';
  };

  getDescription = (): string => {
    return this.description || '';
  };

  getName = (): string => {
    return this.name || '';
  };

  save = (): boolean => {
    return true;
  };
}
