import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const cataclysm = [
  'You receive news or intuition – a close relative has died.',
  'You become afflicted by a serious illness.',
  'Your homeland is destroyed / invaded.',
  'A natural disaster occurs in your immediate area',
  'A large scale war has erupted in your homeland. Perhaps you have been called to duty.',
  'You are mistaken for a wanted criminal and have militia pursuing you.',
  'Robbed! You have lost an item from your inventory (you choose what). Who took this?',
  'Demonic Possession.',
  'Arranged Marriage.',
  'Wrongful Imprisonment.',
  'A priceless family Heirloom / Relic belonging to your tribe or family has been stolen.',
  'Something catastrophic (an invading collusus / outbreak of disease / reak of disease / you decide) is happening in your home town.',
  'A rare arcane phenomenon is occurring in your immediate area (e.g., a planar tear which horrific monsters enter your world through).',
  'A contract has been put on your head by one of your one of your enemies.',
  'Your home or stronghold is either severely damaged or completely destroyed.',
  'Death of a close friend or acquaintance.',
  'The entire realm is being invaded by hostile forces.',
  'Death of a king/queen or powerful ruler.',
  'Scandalous revelation pertaining to your family.',
  'Something terrible that directly relates to something in your character’s background.',
];
const neutral = [
  'Come down with a nasty cold or other illness',
  'Receive a letter from the government dealing with a mundane matter',
  'Receive news of a relative getting married',
  'Receive news of a relative having a child',
  'Called on for some sort of civil service',
  'An opportunity regarding your career appears',
  'A new career presents itself',
  'You receive news that something you did is highly regarded',
  'You have a bit of a toothache or other minor health problem',
  'You’re just feeling a bit… blah today. Perhaps your character just wants to find a nice inn and have a bit of personal time reading and relaxing. This adventuring life takes it out of you!',
  'A local noble has challenged you to a duel, for some slight, real or imagined',
  'You get the feeling that you are being followed, watched perhaps. It’s nothing you can put your finger on, just a growing feeling that you’ve had the past day or had the past day or so.',
  'A beast has attached itself to you. It seems quite friendly.',
  'Someone entrusts you with a secret',
  'You learn some interesting local news which may or may not be of relevance to you. Perhaps roll on Keywords table (p.167) for details.',
  'You have some sort of epiphany related to the particular inner path you are on, spiritual or otherwise',
  'A random stranger presents you with a gift. A trinket perhaps. Roll on Trinkets table, pp. 160-161 of the Player’s Handbook.',
  'You meet an NPC, perhaps someone you know from your past.',
  'An NPC or travelling companion receives some interesting news',
  'Someone comes past with a cart or other transportation, offering you a lift to where you’re going',
];
const miracle = [
  'Birth of a Child. Is it yours, or a close relative’s? If not yours, then this child will at least see you as a major role model.',
  'Positive news related to your career',
  'A romantic interest is reciprocating your attentions',
  'Choose the one which you think is most appropriate. 1: A young person is gravitating towards you as a mentor and wants to accompany you and learn from you. 2: An older and learn from you. 2: An older person is interested in taking you as an apprentice. You could learn some valuable things  things from this person (possible feat, tool proficiency etc).',
  'A friend just left you a map leading to a major treasure hoard',
  'You are freed from a curse or other affliction which has affected you for some time. This could relate to your background. If this is not relevant, re-roll.',
  'Smiled on by your Deity / Divine Inspiration. Roll three times on the Boon table (p.152) and choose one result',
  'You discover a portal which leads to somewhere you’ve been wanting to visit for a while now.',
  'A relative has died leaving you wealth! Roll on the Hoard table for CR 5. Hoard table for CR 5. You may have to travel to claim this treasure, however. But it’s not going anywhere.',
  'You meet a person who has heard of you and a particular problem that you have. They have searched you out because they are passionate about helping you solve this problem.',
  'Something or someone that was previously lost is now found. This may relate to your background. Reroll if not relevant.',
  'You discover a long-lost or unknown relative (possibly a twin?) that you did not you had. And they have a fascinating backstory, one which is remarkably similar to your own.',
  'You gain a temporary insight into the future - a prophetic vision. A mystery regarding your current quest is revealed to you.',
  'The realm wants to bestow some sort of honour on you, in recognition of your brave exploits!',
  'A curse or affliction affecting you or someone you care about is removed.',
  'The gods have blessed you with uncommon prowess. Increase an ability score of your choice by 1.',
  'You have been offered a lucrative occupation within the realm, possibly in the service of the ruler. The position is well-paid and perfectly suited to your talents. Roll keywords or choose something appropriate to your character.',
  'The ruler of these lands has invited you to perform a service for a service for them, with a considerably high reward',
  'A wealthy relative has died, leaving you a sizable property',
];

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Fate';

export const FateGenerator = (fields: any) => {
  const anything = random(1, 100);
  if (anything <= 92) {
    return 'Nothing happens';
  } else if (anything <= 96) {
    return neutral[random(1, neutral.length) - 1];
  } else if (anything <= 98) {
    return cataclysm[random(1, cataclysm.length) - 1];
  } else {
    return miracle[random(1, miracle.length) - 1];
  }
};

export const Fate = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: FateGenerator,
    writeToLog,
  });
};
