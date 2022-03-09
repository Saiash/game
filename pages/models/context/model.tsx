export class DefaultModel {
  id: string = '';

  constructor(data) {
    this.id = data.id;
  }

  save = (): boolean => {
    return false;
  };

  getText = (): string => {
    return '';
  };

  setText = (text: string): void => {};
  getRaw = (): string => {
    return '';
  };
}
