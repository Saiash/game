import _, { isArray } from 'lodash';
import { ResolveResult } from '../../../skills/skillManager';
import { CTX } from '../../../../../types';
import { ActionPayload } from '../../../../engine/actionConnector';
import { Event } from '../../../../models/events';
import {
  EventAction,
  Tag,
  TagInput,
} from '../../../../managers/tag/models/tag';
import { ACTION_PAYLOAD_TYPE } from '../../../../engine/constants';
import { Character } from '../../../characters';

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
  addTag,
};

async function removeSelfStatus(
  input: ActionPayload,
  effects: EventAction['effect']
): Promise<ResolveResult> {
  if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL)
    return returnDefaultResult();
  const target = input.target;
  if (!target) return returnDefaultResult();
  if (typeof effects === 'string' || !isArray(effects)) {
    return returnDefaultResult();
  }
  effects.forEach(e => {
    target.removeStatus(e as string);
  });
  return { executed: true, checkResult: { result: true } };
}

async function addSelfStatus(
  input: ActionPayload,
  effects: EventAction['effect']
): Promise<ResolveResult> {
  if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL)
    return returnDefaultResult();
  const target = input.target;
  if (!target) return returnDefaultResult();
  if (typeof effects === 'string' || !isArray(effects)) {
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
  if (input.payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL)
    return returnDefaultResult();
  const actor = input.sourceActor;
  if (!actor || !isArray(effect)) return { executed: false };
  for (const e of effect) {
    await actor.lore.add(e as string);
  }
  return { executed: true, checkResult: { result: true } };
}

async function addTag(
  input: ActionPayload,
  effect: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  const target = input.target;
  if (!(target instanceof Character)) return { executed: false };
  // if ((effect as TagInput).type === 'mod') {
  //   return addMod(input, effect, ctx);
  // }
  const effectTag = new Tag(effect as TagInput, target, ctx);
  target?.tags.addMod(effectTag);
  return { executed: true, checkResult: { result: true } };
}

// async function addMod(
//   input: ActionPayload,
//   effect: EventAction['effect'],
//   ctx: CTX
// ) {
//   const target = input.target;
//   if (!(target instanceof Character)) return { executed: false };
//   const effectTag = new Tag(effect as TagInput, target, ctx);
//   if (effectTag.getModType() === 'attribute') {
//     let attr: any = target.attributeManager.getByCode(effectTag.getModTarget());
//     if (!attr) {
//       attr = target.secondaryAttributes.getByCode(effectTag.getModTarget());
//     }
//   }
//   return { executed: true, checkResult: { result: true } };
// }

async function triggerEvent(
  input: ActionPayload,
  effects: EventAction['effect'],
  ctx: CTX
): Promise<ResolveResult> {
  const target = input.target;
  if (!target || !isArray(effects)) return { executed: false };
  for (const e of effects) {
    const event = await Event.getEventById(e as string, ctx, input);
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
