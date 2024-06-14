import { CTX } from '../../../types';
import { Character } from '../../models/characters';
import {
  battleActionPayload,
  battleManeurs,
  characterBattleInfo,
  characterStatus,
  damagePayload,
  pose,
} from './types';

export class BattleEngine {
  ctx: CTX;
  characters: Record<number, characterBattleInfo> = {};
  turnOrder: number[] = [];

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
  }

  private generateBasicStatus(): characterStatus {
    return {
      coordinates: { x: 0, y: 0, direction: 'n' },
      stunned: false,
      defense: {
        availible: true,
        dodgePentaly: 0,
        parryPentaly: 0,
        blockPenalty: 0,
      },
      aim: {
        target: -1,
        turnsCount: 0,
      },
      watch: {
        target: -1,
        turnsCount: 0,
      },
      pose: 'stand',
      movement: 0,
      maxMovement: 5,
      fastAction: true,
      action: true,
    };
  }

  private useAction(charactedId: number) {
    this.characters[charactedId].status.action = false;
  }

  private useFastAction(charactedId: number) {
    this.characters[charactedId].status.fastAction = false;
  }

  private makeStep(charactedId: number, steps: number) {
    this.characters[charactedId].status.movement += steps;
  }

  public initBattle(characters: Character[]) {
    characters.forEach(character => {
      this.characters[character.getId()] = {
        character: character,
        status: this.generateBasicStatus(),
      };
      this.turnOrder.push(character.getId());
    });
    this.turnOrder.sort((a, b) => {
      return (
        this.characters[a].character.attributeManager
          .getByCode('speed')
          .getValue() -
        this.characters[b].character.attributeManager
          .getByCode('speed')
          .getValue()
      );
    });
  }

  public getCurrentActingCharacter() {
    return this.turnOrder[0];
  }

  performTurn() {
    const characterId = this.turnOrder.shift();
    if (!characterId) return;
    this.turnOrder.push(characterId);
  }

  endTurn(actorId: number) {
    const character = this.characters[actorId];
    if (character.status.stunned) {
      const int = character.character.attributeManager.getByCode('int');
      const ht = character.character.attributeManager.getByCode('ht');
      const result = int.getValue() > ht.getValue() ? int.check() : ht.check();
      if (result.result) {
        character.status.stunned = false;
      }
    }
  }

  public performAction({
    actorId,
    maneur,
    attackOptions,
    defenceOptions,
    otherOptions,
  }: battleActionPayload): damagePayload | null {
    const maneurs: Record<battleManeurs, any> = {
      attack: 'actionAttack',
      totalAttack: 'actionTotalAttack',
      aim: 'actionAim',
      defence: 'actionDefence',
      totalDefence: 'actionTotalDefence',
      changePose: 'actionChangePose',
      concentration: 'actionConcentration',
      wait: 'actionWait',
      watch: 'actionWatch',
      feint: 'actionFeint',
      move: 'actionMove',
      moveAndAttack: 'actionMoveAndAttack',
      ready: 'actionReady',
      prepare: 'actionPrepare',
    };
    //@ts-ignore
    return this[maneurs[maneur]]({
      actorId,
      attackOptions,
      defenceOptions,
      otherOptions,
    });
  }

  private actionAttack({ actorId, attackOptions }: battleActionPayload) {
    if (!attackOptions) return null;
    this.useAction(actorId);
    const actor = this.characters[actorId];
    const result = actor.character.battleManager.attack(attackOptions);
    this.ctx.gameData.log.addEvent({ text: 'attack!' });
    this.ctx.gameData.log.addEvent({ text: JSON.stringify(result) });
    return result;
  }

  private actionAim({ actorId, attackOptions }: battleActionPayload) {
    if (!attackOptions) return null;
    this.useAction(actorId);
    const actor = this.characters[actorId];
    actor.status.action = false;
    if (
      actor.status.aim.target === attackOptions.target &&
      actor.status.aim.turnsCount < 3
    ) {
      actor.status.aim.turnsCount++;
    } else if (actor.status.aim.target !== attackOptions.target) {
      actor.status.aim = {
        target: attackOptions.target,
        turnsCount: 1,
      };
    }
    //TODO: проверка линии видимости
    //дает бонус к прицеливанию, равный прицеливанию оружия
    //можно делать шаг
    //TODO: активная защита сбивает прицел
    //TODO: при раненнии - проверка воли, что бы не потерять прицел
    //TODO: любое действие кроме прицела сбрасывает прицел в ноль
  }

  private actionTotalAttack({
    actorId,
    maneur,
    attackOptions,
  }: battleActionPayload) {
    //TODO: доступно только если движение не больше половины доступного.
    if (!attackOptions) return null;
    this.characters[actorId].status.defense.availible = false;
    if (attackOptions.attackType === 'melee') {
      return this.actionMeleeTotalAttack({ actorId, maneur, attackOptions });
    }
    return this.actionRangedTotalAttack({ actorId, maneur, attackOptions });
  }

  private actionMeleeTotalAttack({
    actorId,
    maneur,
    attackOptions,
  }: battleActionPayload) {
    if (!attackOptions) return null;
    if (!attackOptions.options) return null;
    const { type } = attackOptions.options;
    if (type === 'strong') {
      attackOptions.options.dmgMod = (attackOptions.options.dmgMod || 0) + 2;
    } else if (type === 'determined') {
      attackOptions.options.accuracy =
        (attackOptions.options.accuracy || 0) + 4;
    } else if (type === 'feint') {
      this.actionFeint({ actorId, maneur, attackOptions });
    } else if (type === 'double') {
      this.actionAttack({ actorId, maneur, attackOptions });
    }
    return this.actionAttack({ actorId, maneur, attackOptions });
  }

  private actionRangedTotalAttack({
    actorId,
    maneur,
    attackOptions,
  }: battleActionPayload) {
    if (!attackOptions) return null;
    if (!attackOptions.options) return null;
    const { type } = attackOptions.options;
    if (type === 'determined') {
      attackOptions.options.accuracy =
        (attackOptions.options.accuracy || 0) + 4;
    }
    return this.actionAttack({ actorId, maneur, attackOptions });
  }

  private actionTotalDefence({
    actorId,
    maneur,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {
    const option = defenceOptions?.totalDefenceOptions || 'improved';
    if (option === 'improved') {
      return this.actionDefence({ actorId, maneur, defenceOptions }, 2);
    } else {
      const firstAttempt = this.actionDefence({
        actorId,
        maneur,
        defenceOptions,
      });
      if (firstAttempt?.defenceRoll.result) {
        return firstAttempt;
      }
    }
    return this.actionDefence({ actorId, maneur, defenceOptions });
  }

  private actionDefence(
    { actorId, defenceOptions }: battleActionPayload,
    mod: number = 0
  ) {
    if (!defenceOptions) return null;
    this.useAction(actorId);
    const actor = this.characters[actorId];
    const result = this.characters[actorId].character.battleManager.defence(
      defenceOptions,
      actor.status.defense,
      mod + (actor.status.stunned ? -4 : 0)
    );
    this.ctx.gameData.log.addEvent({ text: 'defence!' });
    this.ctx.gameData.log.addEvent({ text: JSON.stringify(result) });
    return result;
  }

  private actionChangePose({ actorId, otherOptions }: battleActionPayload) {
    if (!otherOptions) return null;
    const { changePoseDirection } = otherOptions;
    const poses: pose[] = ['stand', 'crouch', 'lay'];
    if (!changePoseDirection) return null;
    if (
      (this.characters[actorId].status.pose === 'crouch' &&
        otherOptions.changePoseDirection === 'up') ||
      (this.characters[actorId].status.pose === 'stand' &&
        otherOptions.changePoseDirection === 'down')
    ) {
      this.makeStep(actorId, 1);
    } else {
      this.makeStep(actorId, this.characters[actorId].status.maxMovement);
      this.useAction(actorId);
    }
    const index = poses.findIndex(
      p => p === this.characters[actorId].status.pose
    );
    if (
      (otherOptions.changePoseDirection === 'up' && index === 0) ||
      (otherOptions.changePoseDirection === 'down' &&
        index === poses.length - 1)
    ) {
      return null;
    } else if (otherOptions.changePoseDirection === 'up') {
      this.characters[actorId].status.pose = poses[index - 1];
    } else {
      this.characters[actorId].status.pose = poses[index + 1];
    }

    return this.characters[actorId].status.pose;
  }

  private actionConcentration({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {
    //заклинания, броски чувств, etc, используется какая-то своя логика других резолверов
    //концентрация часто длительное действие и ее надо поддерживать
    //она может быть прервана уроном и прочим
  }

  private actionWait({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {
    this.makeStep(actorId, this.characters[actorId].status.maxMovement);
    this.useAction(actorId);
    this.useFastAction(actorId);
  }

  private actionWatch({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {
    const actor = this.characters[actorId];
    if (!attackOptions?.target) return null;
    if (actor.status.watch.target === attackOptions.target) {
      actor.status.watch.turnsCount++;
      if (actor.status.watch.turnsCount > 3) {
        actor.status.watch.turnsCount = 3;
      }
    } else {
      actor.status.watch.target = attackOptions.target;
      actor.status.watch.turnsCount = 1;
    }
    this.useAction(actorId);
  }

  private actionFeint({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {
    if (!attackOptions) return null;
    const result =
      this.characters[actorId].character.battleManager.checkWeapon(
        attackOptions
      );
    if (!result?.result) return null;
    const defenceResult = this.characters[
      attackOptions.target
    ].character.battleManager.checkWeapon({
      hand: 'right',
      target: actorId,
      zone: 'torso',
      setIndex: 0,
      attackType: 'melee',
    });
    if (!defenceResult?.result) return result.successMargin;
    return result.successMargin - defenceResult.successMargin;
  }

  private actionMove({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {}

  private actionMoveAndAttack({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {}

  private actionReady({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {}

  private actionPrepare({
    actorId,
    attackOptions,
    defenceOptions,
  }: battleActionPayload) {}

  public resolveBattle() {
    this.characters = [];
  }
}
