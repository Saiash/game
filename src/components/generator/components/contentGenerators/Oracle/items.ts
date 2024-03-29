import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const items = [
  'Hammer (PHB)',
  'Sprung trap, rusted shut.',
  'Record of a criminal trial',
  'Splintered club 5. Copper coin',
  'Greatclub (Weapon, PHB)',
  'Rusty armour',
  'Mess kit (PHB)',
  'Moss',
  'Rubble & debris',
  'Broken weapon',
  'Net (Weapon, PHB)',
  'Text on armour making',
  'Cracks in the wall/floor/ceiling',
  'The hilt of a dagger',
  'Manacles (PHB)',
  'Loincloth',
  'Fishing tackle',
  'Damp area 20. Bedroll (PHB)',
  'Rubble & debris',
  'Caltrops',
  'Arrowheads',
  'Soap',
  'Backpack',
  'Abacus',
  'Broken pots /vases',
  'Holy symbol (PHB)',
  'Dried blood',
  'Rotting carcass of recent dead animal/adventurer/previous inhabitant.',
  'Decaying stores of food/equipment',
  'Chair',
  'Healer’s kit (PHB)',
  'Text on astrology',
  'Dung',
  'Rubble & debris',
  '37. Cracked flask Food scraps',
  'Grappling hook (PHB)',
  'Ransacked chest',
  'Necklace pouch',
  'Tiny music box',
  'Fungi',
  'Hair or fur',
  'Longbow (Weapon, PHB)',
  'Dented helmet',
  'Leather boot',
  'Club (Weapon, PHB)',
  'Old rest-site with old or recent bedrolls.',
  'Rotted creatures nest, with old eggshells/fledge eggshells/fledgeling bones in it. ling bones in it.',
  'A makeshift shrine.',
  'Wood saw',
  'Rubble & debris',
  'Bag of 1000 ball bearings (PHB)',
  'Text on brewing',
  'Leaves and twigs',
  'Mould, common',
  'Pick handle',
  'Druidic focus (PHB)',
  'Text on exotic flora or fauna',
  'Metal file',
  'Rusty nose ring',
  'A small figurine with some burnt-out candles',
  'Spikes, Iron x 10 (PHB)',
  'Broken pole',
  'Pottery shards',
  'Glass jar with a preserved animal',
  'Rags',
  'Acid Vial (PHB)',
  'A basket',
  'Set of common clothes (PHB)',
  'Rubble & debris',
  'A cutting board with a small hunting knife stuck upright in it',
  'Magnifying glass (PHB)',
  'Corpse',
  'Training dummies with a couple of arrows sticking out',
  'Flask of holy water (PHB) 78. Doorknocker',
  'Torture rack',
  'Torch stub',
  'Antitoxin (PHB)',
  'Pliers',
  'Puddle of water',
  'Crowbar',
  'Hammer, sledge (PHB)',
  'Text on herbalism',
  'Plate',
  'Wax blob (candle stub)',
  'Pouch',
  'Pieces of rotting wood',
  'Alchemist’s Fire (PHB)',
  'Corpse',
  'Tally marks scratched on a surface. 135. Longsword (Weapon, PHB)',
  'Old chair leg',
  'Compass',
  'Rubble & debris',
  'Unexploded smoke bomb',
  'Set of lockpicks',
  'Dagger (Weapon, PHB)',
  'Hunting trap (PHB)',
  'Wire cutters',
  'Rubble & debris',
  'Wizard’s Spell book (contains 1d8 x Level1d4 spells)',
  'A key (to a door in another dungeon perhaps?)',
  'Rubble & debris 91. Lute',
  'Spyglass (PHB)',
  'Burnt-out torches. (Q/A to find out what)',
  'Wads of dirty hair and rags.',
  'Ink, bottle (PHB)',
  'Component pouch',
  'Decayed rope',
  'Thumbscrews',
  'Mirror, steel (PHB)',
  'Broken bottle',
  'Torn sack',
  'Lance (Weapon, PHB)',
  'Barrel',
  'Slime (harmless) 105. Bloody rags',
  'Hourglass (PHB)',
  'Bones',
  'Coffin',
  'Heavy crossbow (Weapon, PHB)',
  'Rubble & debris',
  'Rusted spike',
  'Graffiti',
  'Shrunken head',
  'Stones of interesting colour/shape',
  'Quill',
  'Crossbow Bolt case (PHB)',
  'Bottle of whisky',
  'Tattered old hat',
  'Broken sword blade 120. Teeth or fangs, scattered',
  'Brazier & charcoal',
  'Brazier & charcoal (lit)',
  '10 ft pole (PHB)',
  'Bucket',
  'Candelabrum',
  'Map',
  'Sprigs of wolfsbane',
  'Lock (PHB)',
  'Small idol',
  'Rolled up mat/rug',
  'Hammer, sledge (PHB)',
  'Rubble & debris',
  'Text on mathematics 150. Sconce',
  'Small painting',
  'Hand crossbow (Weapon, PHB)',
  'Text on masonry',
  'Potion of greater healing',
  'Glass eye',
  'Velvet purse',
  '10 feet of chain (PHB)',
  'Buds of garlic',
  'Standard graffiti in orcish or dwarven',
  'Large pile of dung',
  'Random paper with hastily-scribbled words and phrases',
  'Eggshells',
  'Blowgun (Weapon, PHB) 164. Crate',
  'Historical text',
  'Halberd (Weapon, PHB)',
  'Folded shroud',
  'Shedded snakeskin',
  'Rope, hempen (50 ft.) (PHB)',
  'Text on masonry',
  'Cushion',
  'Lantern, bullseye (PHB)',
  'Rubble & debris',
  'Empty bottles',
  'd10 incense sticks',
  'Dart (Weapon, PHB)',
  'Shrine',
  'Expired torches 179. Iron pot',
  'Handaxe (Weapon, PHB)',
  'Bell',
  'Statue',
  'Candles',
  'Oil flask (PHB)',
  'Potion of Hill Giant Strength (Magic Item, DMG)',
  'Chimes',
  'Staff',
  'GlobsofcandlewaxGlobsofcandlewax',
  'Wooden mallet',
  'Whetstone',
  'Holy writings',
  'Light Crossbow (Weapon, PHB)',
  'Pouch of sand',
  'Last will and testament',
  'Perfume vial (PHB)',
  'Set of pan pipes',
  'Small pouch of berries',
  'Wig',
  'Globs of candlewax',
  'Spear (Weapon, PHB)',
  'Altar cloth',
  'Tapestry (small or large)',
  'Rubble & debris',
  'Text on medicine',
  'Set of traveller’s clothes (PHB)',
  'Urn',
  'Nails',
  'Spiderwebs',
  'War pick (Weapon, PHB)',
  'Shovel',
  'Quill',
  'Shortbow (Weapon, PHB)',
  'Fancy hat',
  'Heretical text',
  'Sheets of blank parchment',
  'Rope, silk (50 ft) (PHB)',
  'Lichen',
  'Oil of slipperiness (Magic Item, DMG)',
  'Maul (Weapon, PHB)',
  'Salve or unguent',
  'Hand drum',
  'Rations (1 day) (PHB)',
  'Forged document',
  'Piton (PHB)',
  'Needle & thread',
  'Skullcap',
  'Rubble & debris',
  'Javelin (Weapon, PHB)',
  'Goggles of Night (Magic Item, DMG)',
  'Tome of forbidden lore',
  'Gong',
  'Unholy symbol',
  'Ammunition - Crossbow bolts (20)',
  'Theological text',
  'Tinderbox (PHB)',
  'd4 wooden stakes',
  'Tray',
  'Sack',
  'Portable ram (PHB)',
  'Tureen',
  'Balance & weights',
  'Ink pen (PHB)',
  'Vase',
  'Frayed rope',
  'Greatsword (Weapon, PHB)',
  'Rubble & debris',
  'Travelogue for an exotic land',
  'Dictionary',
  'Animal hide, cured',
  'Wig',
  'Flail (Weapon, PHB)',
  'Beaker',
  'Unholy writings',
  'Thurible',
  'Sickle (Weapon, PHB)',
  'Rubble & debris',
  'Travelogue of the planes',
  'Corpse',
  'Prayer rug',
  'Book of myths',
  'Set of costume clothes (PHB)',
  'Letter',
  'Bellows',
  'Scroll case',
  'Sling (Weapon, PHB)',
  'Written ravings of a lunatic',
  'Runes',
  'Wineskin',
  'Scale, merchants (PHB)',
  'Incense burner',
  'Burst waterskin',
  'Signal whistle (PHB)',
  'Broken arrows/bolts',
  'Sealing wax (PHB)',
  'Diary',
  'Morningstar (Weapon, PHB)',
  'Bowl',
  'Cage, empty',
  'Rubble & debris',
  'Jar of mysterious beans',
  'Potion of Healing (PHB)',
  'Cauldron',
  'Rubble & debris',
  'Claw from a random beast',
  'Lantern, hooded (PHB)',
  'Robes (PHB)',
  'Tangled string',
  'Warhammer (Weapon, PHB)',
  'Navigational star chart',
  'Magic scroll',
  'Crystal ball',
  'Light hammer (Weapon, PHB)',
  'Decanter',
  'Herbs',
  'Vial (PHB)',
  'Magic circle',
  'Pick, miners (PHB)',
  'Mortar & pestle',
  'Jug or pitcher',
  'Rubble & debris',
  'Climber’s Kit (PHB)',
  'Parchment',
  'Pound of salt',
  'Pouch of tobacco',
  'Straw',
  'Mace (Weapon, PHB)',
  'Rags',
  'Scimitar (Weapon, PHB)',
  'Map',
  'Bottle of ale',
  'Book of heraldry',
  'Prism',
  'Torch (PHB)',
  'Quill 310. Strip of leather',
  'Potion of Greater Healing (Magic Item, PHB)',
  'Corpse',
  'Piece of chalk',
  'Whip (Weapon, PHB)',
  'Fruit peel',
  'Pouch',
  'Pike (Weapon, PHB)',
  'Rubble & debris',
  'Scroll',
  'Skull',
  'Battleaxe (Weapon, PHB)',
  'Earplugs in a small pouch',
  'Brass locket with a picture 324. Smoking pipe',
  'Flowers, dried',
  'Greataxe (Weapon, PHB)',
  'Skeleton key',
  'Vial of blood',
  'Measuring spoon',
  'Dice',
  'Waterskin (PHB)',
  'Horse’s bridle',
  'Rubble & debris',
  'Mysterious paste in a jar',
  'Hourglass',
  'Kettle',
  'Flute',
  'Awl 339. Poison, basic (PHB)',
  'Vomit',
  'Bottle of wine',
  'Gaming set',
  'Bandages',
  '10 ft. ladder (PHB)',
  'Hairbrush',
  'Jar of grease',
  'Set of fine clothes (PHB)',
  'Rubble & debris',
  'Sheet music',
  'Pouch of white flour',
  'Loaf of bread (unspoilt), wrapped in cloth',
  'Drinking horn',
  'Child’s toy',
  'Small knife',
  'Rubble & debris',
  'Rapier (Weapon, PHB)',
  'Bestiary 361. Bottle of mead',
  'Cup',
  'Tankard',
  'Arcane Focus (PHB)',
  'Flagon',
  'Shortsword (Weapon, PHB)',
  'Prayer book',
  'Potion of Superior Healing (Magic Item, PHB)',
  'Lamp (PHB)',
  'Ledger of accounts',
  'Corpse',
  'Potion of healing',
  'Jar of some unknown substance',
  'Pitchfork 375. Quiver (PHB)',
  'Glaive (Weapon, PHB)',
  'Property deed',
  'Candle snuffer',
  'Walking stick',
  'Pouch of marbles',
  'Rubble & debris',
  'Potion of Healing',
  'Packet of spice',
  'Trident (Weapon, PHB)',
  'Knucklebones',
  'Driftglobe (Magic Item, DMG)',
  'Scissors',
  'Recipe book',
  'Small casket 390. Prayer beads',
  'Potion of Healing (PHB)',
  'Box of matches',
  'Skull of a humanoid',
  'Royal proclamation',
  'Ladle',
  'Vial of cologne',
  'Lock of hair',
  'Comb',
  'Whetstone (PHB)',
];

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Items';

export const ItemsGenerator = (fields: any) => {
  const roll = random(1, items.length) - 1;
  return items[roll];
};

export const Items = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: ItemsGenerator,
    writeToLog,
  });
};
