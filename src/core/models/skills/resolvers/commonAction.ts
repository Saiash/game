import { SkillResolver } from '.';
import { ActionPayload } from '../../../engine/actionConnector';
import { ResolveResult } from '../types';

export class CommonActionResolver extends SkillResolver {
  async resolve(input: ActionPayload): Promise<ResolveResult> {
    return this.resolveCommonAction(input, true);
  }
}
