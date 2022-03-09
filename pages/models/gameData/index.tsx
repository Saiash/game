import { Character } from '../../models/characters';
import { Dexterity } from '../../models/characters/attributes/models/dexterity';
import { Skill } from '../../models/characters/skills/skill';

export class GameData {
  playerCharacter: Character;

  constructor() {
    this.playerCharacter = new Character({
      name: 'Test Name',
      attributeProps: [{ ...Dexterity.getDefaultProps(), rawValue: 13 }],
      skillProps: [
        {
          skillProps: { ...Skill.getDefaultProps(), parentAttrCode: 'dex' },
          exp: 10,
        },
      ],
    });
  }

  getPlayerCharacter(): Character {
    return this.playerCharacter;
  }
}
