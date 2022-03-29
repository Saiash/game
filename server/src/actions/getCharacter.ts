import { Character } from '../models/characters';

export default function getCharacter(data) {
  const { name } = data;
  const character = new Character({
    name,
  });
  return character;
}
