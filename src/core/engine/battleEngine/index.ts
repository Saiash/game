import { CTX } from '../../../types';
import { Character } from '../../models/characters';

export type characterBattleInfo = {
  character: Character;
  status: characterStatus;
};

export type pose = 'stand' | 'lay' | 'crouch';
export type direction = 'n' | 's' | 'nw' | 'ne' | 'se' | 'sw';
//TODO: хранить историю изменения состояний в бою?
//TODO: Маневры: Прицеливание, Тотальная Атака, Тотальная Защита, Атака, Смена позы, Концентрация, Без- действие, Оценка, Финт, Движе- ние, Движение и Атака, Подго- товка и Ожидание
export type characterStatus = {
  coordinates: { x: number; y: number; direction: direction };
  step: boolean;
  movement: number;
  fastAction: boolean;
  action: boolean;
  defense: {
    availible: boolean;
    dodgePentaly: number;
    parryPentaly: number;
    blockPenalty: number;
  };
  pose: pose;
};

export class BattleEngine {
  ctx: CTX;
  characters: Record<number, characterBattleInfo> = {};
  turnOrder: number[] = [];

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
  }

  generateBasicStatus(): characterStatus {
    return {
      coordinates: { x: 0, y: 0, direction: 'n' },
      defense: {
        availible: true,
        dodgePentaly: 0,
        parryPentaly: 0,
        blockPenalty: 0,
      },
      pose: 'stand',
      step: false,
      movement: 0,
      fastAction: false,
      action: false,
    };
  }

  initBattle(characters: Character[]) {
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

  getCurrentActingCharacter() {
    return this.turnOrder[0];
  }

  performTurn() {
    const characterId = this.turnOrder.shift();
    if (!characterId) return;
    this.turnOrder.push(characterId);
  }

  actionAim(actorId: number, targetId: number) {
    this.characters[actorId].status.action = false;
  }

  resolveBattle() {
    this.characters = [];
  }
}
