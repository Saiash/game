import _ from 'lodash';
import { ResolveResult } from '../..';
import { CTX } from '../../../../../types';
import { ActionPayload } from '../../../../actionConnector';
import { Event } from '../../../../events';

import type { EventAction } from '../../../../events';

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
  if (input.payload.type !== 'useSkill') return { executed: false };
  const target = input.target;
  if (!target) return { executed: false };
  effects.forEach(e => {
    if (typeof e === 'string') target.removeStatus(e);
  });
  return { executed: true, checkResult: { result: true } };
}

async function addSelfStatus(
  input: ActionPayload,
  effects: EventAction['effect']
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return { executed: false };
  const target = input.target;
  if (!target) return { executed: false };
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
  if (input.payload.type !== 'useSkill') return { executed: false };
  const actor = input.sourceActor;
  if (!actor) return { executed: false };
  for (const e of effect) {
    if (typeof e !== 'string') await actor.lore.add(e.id);
  }
  return { executed: true, checkResult: { result: true } };
}

async function triggerEvent(
  input: ActionPayload,
  effects: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  if (input.payload.type !== 'useSkill') return { executed: false };
  const target = input.target;
  if (!target) return { executed: false };
  for (const e of effects) {
    if (typeof e !== 'string') {
      const event = await Event.createNewEvent(e.id, ctx, input);
      await event.execute();
    }
  }
  return { executed: true, checkResult: { result: true } };
}

async function sendMessage(
  input: ActionPayload,
  effects: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  for (const e of effects) {
    if (typeof e === 'string') {
      ctx.gameData.log.addEvent({ text: e });
    }
  }
  return { executed: true, checkResult: { result: true } };
}
