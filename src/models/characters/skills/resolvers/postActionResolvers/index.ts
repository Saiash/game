import _ from 'lodash';
import { ResolveResult } from '../..';
import { CTX } from '../../../../../types';
import { ActionPayload } from '../../../../actionConnector';
import { Event } from '../../../../events';
import { EventAction } from '../../../../tag/models/tag';

export const POST_ACTIONS_RESOLVERS: {
  [index: string]: (
    input: ActionPayload,
    effects: EventAction['effect'],
    ctx: CTX
  ) => Promise<ResolveResult>;
} = {
  removeSelfStatus,
  sendMessage,
  addSelfStatus,
  triggerEvent,
  addLore,
};

async function removeSelfStatus(
  input: ActionPayload,
  effects: EventAction['effect']
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return returnDefaultResult();
  const target = input.target;
  if (!target) return returnDefaultResult();
  if (typeof effects === 'string') {
    return returnDefaultResult();
  }
  effects.forEach(e => {
    target.removeStatus(e);
  });
  return { executed: true, checkResult: { result: true } };
}

async function addSelfStatus(
  input: ActionPayload,
  effects: EventAction['effect']
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return returnDefaultResult();
  const target = input.target;
  if (!target) return returnDefaultResult();
  if (typeof effects === 'string') {
    return returnDefaultResult();
  }
  effects.forEach(e => {
    if (typeof e === 'string') target.addStatus(e);
  });
  return { executed: true, checkResult: { result: true } };
}

async function addLore(
  input: ActionPayload,
  effect: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return returnDefaultResult();
  const actor = input.sourceActor;
  if (!actor) return { executed: false };
  for (const e of effect) {
    await actor.lore.add(e);
  }
  return { executed: true, checkResult: { result: true } };
}

async function triggerEvent(
  input: ActionPayload,
  effects: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return returnDefaultResult();
  const target = input.target;
  if (!target) return { executed: false };
  for (const e of effects) {
    const event = await Event.createNewEvent(e, ctx, input);
    await event.execute();
  }
  return { executed: true, checkResult: { result: true } };
}

async function sendMessage(
  input: ActionPayload,
  effects: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  if (typeof effects === 'string') {
    ctx.gameData.log.addEvent({ text: effects });
  }
  return { executed: true, checkResult: { result: true } };
}

function returnDefaultResult(): ResolveResult {
  return { executed: false };
}
