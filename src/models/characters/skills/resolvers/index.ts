import { CheckResults, ResolveResult } from '..';
import { Character } from '../..';
import { ActionPayload } from '../../../actionConnector';
import { Location } from '../../../locations';
import { ObjectModel } from '../../../locations/object';
import { Item } from '../../inventory/item';
import { Lockpicking } from './lockpicking';
import { Condition } from '../../../tag/models/condition';

import type { CTX } from '../../../../types';
import type { conditions } from '../../../tag/models/condition';
import { POST_ACTIONS_RESOLVERS } from './postActionResolvers';
import { Event } from '../../../events';

export class SkillResolver {
  code: string;
  name: string;
  ctx: CTX;

  constructor(props: { ctx: CTX; code: string; name: string }) {
    this.ctx = props.ctx;
    this.code = props.code;
    this.name = props.name;
  }

  commonResolve({
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

  async resolve(input: ActionPayload): Promise<ResolveResult> {
    return { executed: false };
  }

  async resolveCommonAction(
    input: ActionPayload,
    checkResult: boolean
  ): Promise<ResolveResult> {
    if (input.payload.type !== 'useSkill') return { executed: false };
    const tag = input.payload.tag;
    const results = checkResult ? tag.getOnSuccess() : tag.getOnFail();
    const actionsResults = [];
    for (const r of results) {
      const result = await Event.execute({
        data: r,
        ctx: this.ctx,
        input,
        actor: tag.getOwner(),
      });
      actionsResults.push(result);
    }
    return { executed: actionsResults.every(r => r.executed) };
  }
}
