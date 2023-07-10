import { Generator } from './contentGenerators';
import { Oracle } from './contentGenerators/Oracle';
import { Tavern } from './contentGenerators/Tavern';
import { UnmarkedSettlement } from './contentGenerators/UnmarkedSettlement';
import { WildEncounters } from './contentGenerators/Encounters';
import { Rumors } from './contentGenerators/Rumors';
import { contentsGenerators } from './contentGenerators/tables';
import { Button } from '@mui/material';
import { SettlementEncounters } from './contentGenerators/Encounters/settlementEncounters';
import { Quest } from './contentGenerators/Quest';
import { DungeonEncounters } from './contentGenerators/Encounters/dungeonEncounters';
import { Dungeon } from './contentGenerators/Dungeon';
import { Passage } from './contentGenerators/Dungeon/passage';
import { Door } from './contentGenerators/Dungeon/door';
import { Room } from './contentGenerators/Dungeon/room';
import { Trap } from './contentGenerators/Dungeon/trap';
import { DungeonClues } from './contentGenerators/Dungeon/clues';
import { WildClues } from './contentGenerators/Wilderness/clues';
import { WildFeatures } from './contentGenerators/Wilderness/features';
import { WildTerrain } from './contentGenerators/Wilderness/terrain';
import { WildLandscape, WildMonument } from './contentGenerators/Wilderness';
import { WildActivities } from './contentGenerators/Wilderness/activity';
import { Merchants } from './contentGenerators/Settlement/merchants';
import { NPC } from './contentGenerators/NPC';
import { Keywords } from './contentGenerators/Oracle/keywords';
import { Creatures } from './contentGenerators/Monsters/creatures';
import { Monsters } from './contentGenerators/Monsters/monsters';
import { Items } from './contentGenerators/Oracle/items';
import { Fate } from './contentGenerators/Oracle/fate';
import { Dice } from './contentGenerators/Oracle/dice';

type props = {
  addToLog: (value: string) => void;
};

const combinedGenerators = [
  Dice,
  Oracle,
  Fate,
  Items,
  Keywords,
  NPC,
  SettlementEncounters,
  Tavern,
  Rumors,
  Quest,
  Merchants,
  DungeonEncounters,
  Dungeon,
  Passage,
  Door,
  Room,
  Trap,
  DungeonClues,
  WildEncounters,
  WildClues,
  WildFeatures,
  WildTerrain,
  WildLandscape,
  WildMonument,
  WildActivities,
  UnmarkedSettlement,
  Creatures,
  Monsters,
];

export function Content(props: props) {
  const { addToLog } = props;
  const writeToLog = (result: string) => {
    addToLog(result);
  };
  return (
    <div style={{ width: '70%' }}>
      {Object.keys(contentsGenerators).map(generatorName => {
        return (
          <Button
            style={{ margin: 3 }}
            key={generatorName}
            variant="contained"
            onClick={() => {
              const generator = contentsGenerators[generatorName];
              writeToLog(Generator(generator));
            }}
          >
            {generatorName}
          </Button>
        );
      })}
      {combinedGenerators.map(generator => {
        return generator({ writeToLog });
      })}
    </div>
  );
}
