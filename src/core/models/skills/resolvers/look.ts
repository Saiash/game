import { SkillResolver } from '.';
import { ResolveResult } from '../../skills/skillManager';
import { ActionPayload } from '../../../engine/actionConnector';

export class LookResolver extends SkillResolver {
  async resolve(input: ActionPayload): Promise<ResolveResult> {
    return this.resolveCommonAction(input, true);
  }
}
