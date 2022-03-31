export class DefaultModel {
  id: string = '';
  type: string = '';

  constructor(data: any) {
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
