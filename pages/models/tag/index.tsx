export class TagSystem {
  required: tagNode;
  inherited: tagNode;
  applied: tagNode;

  constructor(props: string) {
    this.required = {};
    this.inherited = {};
    this.applied = {};
  }
}

type tagNode = { [index: string]: tagNode | string };
