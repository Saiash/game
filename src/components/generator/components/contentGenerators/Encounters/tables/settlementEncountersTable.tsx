import { randomEncounters } from './randomEncounters';

export const Settlement_Encounters_Table = [
  'Auction taking place. A house being auctioned, or something even more valuable? Feel like buying a house?',
  'Large gathering for some reason, in the middle of the street. Protest? Religious event? Exhibition? Execution? Keywords to add flavour?',
  'Parade / Procession / Funeral procession / Religious festival Which deity is this for? Any rival factions around?',
  'Traffic Traffic jam / Gridlock Gridlock What is causing causing this?',
  'Street Preacher Preacher (Manic?) (Manic?) What nonsense nonsense is this fanatic fanatic spouting? spouting?',
  'Animal going wild / stampeding stampeding Animal handling handling check to control? control?',
  'Official Official proclamation proclamation How strict is the rule here?',
  'Musical Musical / dramatic dramatic performance performance Myths, stories stories of famous adventurers adventurers',
  'New building being opened Keywords to add flavour, or roll merchant',
  'Traffic Traffic accident accident Keywords Keywords to add flavour flavour',
  'Small localised localised fire What merchant merchant is suffering suffering this fate?',
  'Public duel Between Between nobles? nobles? Wizards? Wizards?',
  'Thief grabs purse and runs Get him!',
  'Emptying Emptying slop bucket from second story window The old classic. classic. Dex check?',
  'Mob of rampaging rampaging children children causing causing mischief mischief Where are their parents? parents?',
  'Drunk shouting shouting nonsense nonsense at people All nonsense? nonsense?',
  'Notorious Notorious criminal criminal being led through through streets streets Possibly Possibly on the way to their execution execution',
  'Two merchants (or other people) having heated exchange. Drawing quite a crowd. Is a fight about to erupt?',
  'Woman turning out her husband (or vice versa) for being a naughty boy. Full-on domestic spat. Everyone loves a bit of drama',
  'Spirited Spirited group of minstrels minstrels If you’re a bard, join in!',
  'Dice game Feel like gambling? gambling?',
  'Public beating. beating. Street justice. justice. Innocent Innocent or guilty? guilty?',
  'A pursuit rushes past you. Could be on A pursuit rushes past you. Could be on horseback or horseback or on foot. on foot. Someone chasing someone else. Reason unclear.',
  'Individual Individual being persecuted persecuted (possibly (possibly unfairly) unfairly) by town guard Time for a saviour saviour to step in, perhaps. perhaps.',
  'Town guard trying to break up gathering gathering Fun police! police!',
  'Cart moving through the street, its cargo falling off. Magical supplies = Arcane chaos? Or something more mundane.',
  'Person on top of building building threatening threatening to jump. Why are they so upset?',
  'New business, business, just opened, opened, is attracting attracting a queue / large crowds What would draw such a crowd?',
  'You witness a crime and they have a chance to stop the criminal. If you do, you win the favor of the local constabulary. If you try to but fail, the guard gives you an opportunity to help track down the criminal. If you do nothing, you must convince the guard you are not an accomplice.',
  'Stampede of pigs',
  'A cry rings out through the town. “An army is massing outside the gates!” Are they human, orc, mind flayer? You had better go and find out, or flee right now!',
  'A mysterious hooded beggar conspicuously ducks into an alley as they walk by - they appeared to have a disfigurement. Perhaps they were just trying to hide from people.',
  'A guided tour proceeds past, as the guide drops a particularly tasty snippet of ocal knowledge which the PC was unaware of.',
  'A shady figure beckons from an alley. They have wondrous items for sale, they ay.',
  'wo old ladies, witches of some sort by the look of them, beg you to take a reature off their hands. (Roll Creature Table, Chapter 14). “It never shuts up!” hey tell you. “Please, we’ll pay you! We just want to be rid of the damnded thing!” he creature is the trapped soul of a former adventurer...',
  'wo men are arguing about something. One turns to a PC and says, "You look ike a reasonable man. What do you think?" Could be literally anything at all, and ould result in combat, a job, or just more arguing.',
  'uest board with rewards for deeds done. Someone has rats in their cellar, issing townsperson in the woods neaby, simple things (or complex!) that give ou little things to do that keep you exploring the city, making contacts, and arning gold/interesting items. Use Chapter 14 tables or Q/A rolls to generate.',
  'A card shark/con artist is busking in the street, a large crowd gathers.',
  'wo local thugs are strong arming a merchant for gold. You can help the erchant, but doing so annoys the local gang. Variation: The merchant is a thief, nd the thugs are trying to recover their stolen money.',
  'You notice a group of villagers attempting to put out a nearby house fire. This ooks like it could easily spread to neighbouring houses, possibly affecting the hole town.',
  'A peddler attempts to sell you a trinket or minor magic item.',
  'A giant rat crawls out of a storm drain and gets into a fight with a dog.',
  'Minor earthquake shakes things up and in the ensuing panic looters take dvantage. Does the party join them, or stop them?',
  'Merchant asking for help stopping local children with slingshots.',
  'A young urchin is in an ally, cornered by either thugs or stray dogs.',
  'Street is having a block party tomorrow and need help setting up.',
  'omeone sentenced to death: You happen across the hanging/beheading scene efore it concludes, what do you do?',
  'Monster: Level appropriate easy encounter.',
  'Monster: Level appropriate easy encounter.',
  'Monster: Level appropriate easy encounter.',
  'Monster: Level appropriate easy encounter.',
  'Monster: Level appropriate easy encounter.',
  'A con man is selling jewels and rare components that you might need.',
  'A chamber pot is emptied from above. Make a DC 13 dex save to avoid. If nsuccessful, you disadvantage all charisma and stealth related rolls until you ave a bath and change clothes. (Optional: make a con save vs filth fever).',
  'A scrap of paper is pressed into your hand by a young man, who looks at you esperately before turning and running away. You turn over the note and read it. Please help, he’s coming for us all!”',
  'A member of the local guard asks you what your business is in town.',
  'Stop, thief!” You feel your arms being grabbed. The local guard apprehend you, ccusing you of stealing jewels belonging to a noble/royal. Searching your lothes, and/or bag, they successfully turn up the jewels in question. You, owever, have never seen them before.',
  'A lady / young man on a balcony blows you a kiss and then runs away.',
  'A beggar crouches in a dark corner, clearly diseased.',
  'Someone mistakes you for a mercenary, famous performer, or an old friend. They ave face blindness. 2% of the population have it.',
  'A bard strikes up a song and starts following you around. ',
  'A beggar notices the group and offers to guide them around in exchange for coin.',
  'Bar fight bursts out into the street and may involve the PC.',
  'Propositioned. Person of the night propositions a player. But they may not be all hey seem...',
  'A drunkard sees you and mistakes them for friends or enemies or perhaps throws p on you.',
  'A person who claims to be a fan of the PC begins to follow them around',
  'Snake Oil Salesman has gathered a crowd, and has actors in the group to fool eople into buying worthless potions. Bonus: they`re not worthless, but definitely ot as advertised. A healing potion that`s really gaseous form? Make Q/A rolls to etermine results.',
  'Group of smugglers coming out of a sewer grate with a crate of goods.',
  'An old female fortune teller beckons to you from her tent.',
  'A man tumbles out a tavern window. He’s fully dressed in nobleman’s garb. A emale half-orc jumps out after him, letting out a warcry as he gets up and runs or his life screaming for help. Do you help her and run him down or do you get in er way? Possible: No matter who you help they both begin attacking you!',
  'A street dog runs past with a human hand in its mouth - wearing a large, very bvious jeweled ring. Dog chase or find out what happened to the owner of the ing (and hand).',
  'Someone`s horse is spooked and charges through the streets. whether it’s ragging a wagon or just a rider, it is panicked and needs to be stopped.',
  'You find a map, discarded, on the street, or just a fragment of one, which arouses our curiosity. It shows a ruin, and there is a sketch of an artifact. Magical? erhaps a local mage could help you decode this...',
  'A drunk just wakes up nearby. “Wha… where am I?! My… my weapons! My elongings! They’re gone!”',
  'You stop to listen to a talented storyteller relate a story about a famous dventurer and his beast companion. Part of the story is unresolved, however, and ets you thinking...',
  'You feel a thwack in the side of your head, and turn to see that a bunch of drunk young nobles are pelting passers by with rotten vegetables, laughing as they do so!',
  'Monster: Level appropriate medium encounter.',
  'Monster: Level appropriate medium encounter.',
  'Monster: Level appropriate medium encounter.',
  'Monster: Level appropriate medium encounter.',
  'Monster: Level appropriate medium encounter.',
  'Your sharp eye spots a pickpocket deftly relieve a noblewoman of an expensive necklace',
  'A wizard is carrying a bagful of potions when suddenly the bag rips (perhaps it atches on a nail sticking out of a building, or it catches on a passing cart) and everal potions drop out and smash on the ground, exploding with various ramatic effects.',
  'A jeweller emerges from his shop, screaming that he’s been robbed by dwarves. A earby dwarf asks him for proof, but all he has to say is, “Of course it’s dwarves, hey lust after gems constantly!”',
  'A female priest is castigating a businesswoman who has set up her wares before he temple (of Lathander, perhaps? Any good-aligned god). Except this business is o ordinary business - a female slaver is parading her wares, selling slaves to hoever’s buying.',
  'Something occurs, or you find something, that requires a (roll d10) 1: acrobatics / ex check or save, 2: strength or athletics check, 3: stealth check, 4: con check or ave, 5: int check, 6: investigation check, 7: arcana check, 8: history check, 9: ature check, 10: religion check. Use Q/A rolls or Story Element Interaction ables (chapter 14) to find out what.',
  'Something occurs, or you find something, that requires a (roll d10) 1: acrobatics / ex check or save, 2: strength or athletics check, 3: stealth check, 4: con check or ave, 5: int check, 6: investigation check, 7: arcana check, 8: history check, 9: ature check, 10: religion check. Use Q/A rolls or Story Element Interaction ables (chapter 14) to find out what.',
  'Something occurs, or you find something, that requires a (roll d10) 1: acrobatics / ex check or save, 2: strength or athletics check, 3: stealth check, 4: con check or ave, 5: int check, 6: investigation check, 7: arcana check, 8: history check, 9: ature check, 10: religion check. Use Q/A rolls or Story Element Interaction ables (chapter 14) to find out what.',
  'Something occurs, or you find something, that requires a (roll d10), 1: animal andling check, 2: insight check, 3: survival check, 4: medicine check 5: perception heck, 6: persuasion check, 7: performance check, 8: deception check, 9: nimidation check, 10: charisma check. Use Q/A roll or Story Element Interaction ables (chapter 14) to find out what.',
  'Something occurs, or you find something, that requires a (roll d10), 1: animal andling check, 2: insight check, 3: survival check, 4: medicine check 5: perception heck, 6: persuasion check, 7: performance check, 8: deception check, 9: nimidation check, 10: charisma check. Use Q/A roll or Story Element Interaction ables (chapter 14) to find out what.',
  'Something occurs, or you find something, that requires a (roll d10), 1: animal andling check, 2: insight check, 3: survival check, 4: medicine check 5: perception heck, 6: persuasion check, 7: performance check, 8: deception check, 9: nimidation check, 10: charisma check. Use Q/A roll or Story Element Interaction ables (chapter 14) to find out what.',
  'PC met, who gives PC information about possible quest. Go to Chapter 7 and enerate a quest, which you may or may not accept.',
  'PC met, who gives PC information about possible quest. Go to Chapter 7 and enerate a quest, which you may or may not accept.',
  'PC met, who gives PC information about possible quest. Go to Chapter 7 and enerate a quest, which you may or may not accept.',
  'PC met, who gives PC information about possible quest. Go to Chapter 7 and enerate a quest, which you may or may not accept.',
  'Monster: Level-appropriate hard encounter. Monster on the loose, marauding hrough the streets.',
  'Monster: Level-appropriate hard encounter. Monster on the loose, marauding hrough the streets.',
  'Monster: Level-appropriate hard encounter. Monster on the loose, marauding hrough the streets.',
  'Monster: Level-appropriate hard encounter. Monster on the loose, marauding hrough the streets.',
  'Monster: Level-appropriate hard encounter. Monster on the loose, marauding hrough the streets.',
  'You are stopped by the local guard who want to congratulate you on your recent uccessful quest. How do they know?',
  'PC hears a rumour about a job that a local priest might have. Apparently, or so he rumour goes, something is going on in the sacred catacombs beneath the treets.',
  'You pass a house which is all boarded up, the gates locked. A passerby informs ou that this is the house of a local nobleman who hasn’t been seen in years.',
  'You see a dice game going on in an alley off the street you are walking down.',
  'A cleric stands atop a box on the roadside, spouting vitriol and nasty rumours bout the town’s leader or leaders. The cleric has attracted quite a crowd.',
  'A group of protestors has set up outside the Town Hall, protesting the new road hich is planned to run right through the middle of their settlement, some istance out of town. ',
  'A merchant asks you to mind his cart for him while he chases a thief who has tolen merchandise from it. He then leaves, and doesn’t return for a very long ime...',
  'A street urchin appears, promising divine favour if the PC comes and volunteers n hour of service at a nearby temple.',
  'A shopkeeper is attacking a wasp nest outside of his shop with a broom. He islodges it and it crashes to the ground, engulfing him in a Swarm of Insects!',
  'Two half-orcs are engaged in a full-on brawl outside a nearby tavern. Apparently ne thinks the other cheated at dice.',
  'Religious pilgrims making their way quietly through the streets are being mocked nd jeered by a group of elven teenagers',
  'A tattered cloak blows up the street. Catching hold of it, you find a note in one of ts pockets.',
  'Someone has released a hallucinogenic substance into the air, and people are in arious states of intoxication.',
  'A distraught mother cannot find her child and is convinced it has been kidnapped. he is moving from person to person, begging for help.',
  'A sudden gust of wind whips through the town, sending stalls toppling over, hats lying, stacks of parchment fluttering down the street. Perhaps the PC discovers omething as a result.',
  'A dwarf, armed with greataxe, is threatening a cowering halfling, who is shaking ith fear. The dwarf is living with rage, but has just been disarmed by the town uard. What’s the situation here? Has the halfling wronged him in some way?',
  'An overturned cart ahead is causing gridlock - the street is jammed with traffic.',
  '“Ay oop luv, looking for a good time?” A prostitute (any sex or race) begins oliciting you earnestly.',
  'Suddenly, out of the blue, you see a mage of some sort simply appear in the middle f the street/alley.',
  'NPC appears with quest (see Chapter 7)',
  'NPC appears with quest (see Chapter 7)',
  'NPC appears with quest (see Chapter 7)',
  'NPC appears with quest (see Chapter 7)',
  'NPC appears with quest (see Chapter 7)',
  'Monster: Level appropriate deadly encounter.',
];

export const settlementRandomEcndountersTable = [
  'Wedding ',
  'Gridlocked traffic',
  'Name-giving day celebrations ',
  'Monster invasion!',
  'Public holiday ',
  'Conference of Wizards',
  'Procession ',
  'Graduation ceremony',
  'Harvest Festival ',
  'Traffic accident',
  'Festival celebrating a god ',
  'Freakish weather event',
  'Celebration of a hero’s return ',
  'Fire in Building',
  'Market day ',
  'Notable local figure assassinated',
  'Religious rally ',
  'Public duel',
  'Official proclamation ',
  'Large scale fire',
  'Amnesty ',
  'Sinkhole opens',
  'Sudden storm / gale force winds ',
  'Local army returning after recent skirmish',
  'Election / Change of civic leader ',
  'Co-ordinated attack',
  'Yearly local festival ',
  'Protest',
  'Assassination ',
  'Flood',
  'Performance of a play ',
  'Martial law enforced (Reason?)',
  'Musical concert ',
  'Wild magic eruption',
  'Buskers performance ',
  'Military conscription',
  'Orator / storyteller ',
  'Revolution taking place (scale uncertain)',
  'Alefest ',
  'Public Execution',
  'Warrior exhibition ',
  'Storm',
  'Procession of royals ',
  'Plague',
  'Museum exhibition ',
  'Earthquake',
  'New building being opened ',
  'Dimensional disruption',
  'Large army passing through town 99-',
  '100 Invading force ',
  ...randomEncounters,
];
