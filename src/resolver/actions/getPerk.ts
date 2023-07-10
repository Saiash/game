import fs from 'fs/promises';

export default async function getPerk(input: any) {
  const { data } = input;
  const perkName = data.perkName;
  const path = './src/data/perks/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[perkName]) return parsedData[perkName];
  return '';
}
