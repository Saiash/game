import { CheckResults } from '..';
import { Character } from '../..';
import { CTX } from '../../../../types';
import { Location } from '../../../locations';
import { ObjectModel } from '../../../locations/object';
import { Item } from '../../inventory/item';
import { Lockpicking } from './lockpicking';

export class SkillResolver {
  code: string;
  name: string;
  ctx: CTX;

  constructor(props: { ctx: CTX; code: string; name: string }) {
    this.ctx = props.ctx;
    this.code = props.code;
    this.name = props.name;
  }

  resolve({
    result,
    sourceActor,
    target,
  }: {
    result: CheckResults;
    sourceActor?: Character;
    target?: Character | Item | ObjectModel | Location;
  }): boolean {
    return false;
  }
}
