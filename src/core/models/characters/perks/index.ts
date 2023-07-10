import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { AttributeManager } from '../attributes';
import { Attribute } from '../attributes/attribute';
import { Perk, rawPerkModel } from './perk';
import { Character } from '../index';

import { ActionPayload } from '../../../engine/actionConnector';

import type { CTX } from '../../../../types/';
import { ACTION_PAYLOAD_TYPE } from '../../../engine/constants';

export type CheckResults = {
  rand?: number;
  value?: number;
  result: boolean;
  difficulty?: number;
};

export type ResolveResult = {
  executed: boolean;
  payload?: ActionPayload;
  checkResult?: CheckResults;
  message?: string;
};

export class PerkManager {
  collection: { [index: string]: Perk };
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
    dataloaders,
    name,
  }: {
    dataloaders: CTX['dataloaders'];
    name: string;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    const perkData = (await dataloaders.getPerk(name)) as rawPerkModel;

    const perk = new Perk({
      ctx: this.ctx,
      data: { ...perkData },
    });
    this.collection[name] = perk;
    return true;
  }

  getAsArray(): [string, Perk][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: string) {
    return this.collection[code];
  }

  async resolve(input: ActionPayload): Promise<boolean> {
    let result: ResolveResult = { executed: false };
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_PERK) return false;
    const perk = this.getByCode(input.payload.perk);
    result = await perk.resolve(input);

    if (result.message) {
      this.ctx.gameData.log.addEvent({
        source: result.payload?.sourceActor,
        text: result.message,
      });
    }
    return result.executed || result.checkResult?.result || false;
  }
}
