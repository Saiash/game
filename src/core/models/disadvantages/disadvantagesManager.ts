import { Disadvantage } from './disadvantage';

import { ActionPayload } from '../../engine/actionConnector';

import type { CTX, PartialRecord } from '../../../types';
import { ACTION_PAYLOAD_TYPE } from '../../engine/constants';
import { DISADVANTAGE_LIST, disadvantageList } from '.';
import { Character } from '../characters';
import { ResolveResult } from '../characters/skills/types';

export class DisadvantagesManager {
  collection: PartialRecord<disadvantageList, Disadvantage>;
  character: Character;
  ctx: CTX;

  constructor({
    ctx,
    character,
    input,
  }: {
    ctx: CTX;
    character: Character;
    input?: any;
  }) {
    this.ctx = ctx;
    this.collection = {};
    this.character = character;
  }

  async add({
    name,
    level = 0,
  }: {
    name: disadvantageList;
    level?: number;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    this.collection[name] = DISADVANTAGE_LIST[name]({
      ctx: this.ctx,
      level,
    });
    return true;
  }

  getAsArray(): [string, Disadvantage][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: disadvantageList): Disadvantage | undefined {
    return this.collection[code];
  }

  //   async resolve(input: ActionPayload): Promise<boolean> {
  //     let result: ResolveResult = { executed: false };
  //     if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_PERK) return false;
  //     const disadvantage = this.getByCode(input.payload.disadvantage);
  //     if (!disadvantage) return false;

  //     result = await disadvantage.resolve(input);

  //     if (result.message) {
  //       this.ctx.gameData.log.addEvent({
  //         source: result.payload?.sourceActor,
  //         text: result.message,
  //       });
  //     }
  //     return result.executed || result.checkResult?.result || false;
  //   }
}
