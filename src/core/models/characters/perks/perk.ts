import { Character } from '..';
import { CTX } from '../../../../types';
import { ActionPayload } from '../../../engine/actionConnector';
import { ACTION_PAYLOAD_TYPE } from '../../../engine/constants';
import { TagSystem } from '../../../managers/tag';
import { Event } from '../../events';
import { ObjectModel } from '../../locations/object';
import { perkList } from '../../perks';
import { ResolveResult } from '../skills';

let perkId = 0;

export type rawPerkModel = {
  name: string;
  code: perkList;
  description: string;
  level: number;
  tags: string;
};

export class Perk {
  id: number;
  tags: TagSystem;
  name: string;
  code: perkList;
  level: number;
  description?: string;
  ctx: CTX;

  constructor({ ctx, data }: { ctx: CTX; data: rawPerkModel }) {
    this.id = perkId++;
    this.ctx = ctx;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.level = data.level;
    this.tags = new TagSystem({
      ctx,
      input: { props: data.tags },
      owner: this,
    });
  }

  getLevel(): number {
    return this.level;
  }

  hasStatus(value: string): boolean {
    return false;
  }

  addStatus(value: string): boolean {
    return false;
  }

  removeStatus(value: string): boolean {
    return false;
  }

  isLocked(): boolean {
    return this.hasStatus('locked');
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  async resolve(input: ActionPayload): Promise<ResolveResult> {
    if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_PERK) {
      return { executed: false, payload: input };
    }
    const tags = this.tags.getActiveUsablePerks({});
    const tag = tags[Object.keys(tags)[0]];
    let conditions = true;
    const targets = tag.getTarget<string[]>();
    if (input.target === input.sourceActor) {
      if (!targets.some(t => t === 'self')) {
        conditions = false;
      }
    } else if (input.target instanceof Character) {
      if (!targets.some(t => t === 'characters')) {
        conditions = false;
      }
    } else if (input.target instanceof ObjectModel) {
      if (!targets.some(t => t === 'objects')) {
        conditions = false;
      }
    } else {
      throw new Error('not implemented');
    }

    const effects = tag.getOnSuccess();
    if (!effects) return { executed: false, payload: input };
    const actionsResults = [];
    for (const r of effects) {
      const result = await Event.execute({
        data: r,
        ctx: this.ctx,
        input,
        actor: input.target,
      });
      actionsResults.push(result);
    }
    return { executed: actionsResults.every(r => r.executed) };
  }

  getCultures(): string[] {
    return [];
  }
}
