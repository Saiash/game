import { SkillResolver } from '.';
import { CheckResults, ResolveResult } from '..';
import { Character } from '../..';
import { ActionPayload } from '../../../actionConnector';
import { Item } from '../../inventory/item';

export class CommonActionResolver extends SkillResolver {
  async resolve(input: ActionPayload): Promise<ResolveResult> {
    return this.resolveCommonAction(input, true);
  }
}
