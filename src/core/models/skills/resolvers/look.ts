import { SkillResolver } from '.';
import { ActionPayload } from '../../../engine/actionConnector';
import { ResolveResult } from '../types';

export class LookResolver extends SkillResolver {
  async resolve(input: ActionPayload): Promise<ResolveResult> {
    return this.resolveCommonAction(input, true);
  }
}
