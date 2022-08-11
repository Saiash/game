import fs from 'fs/promises';

export default async function getLore(input: any) {
  const { data } = input;
  const loreName = data.loreName;
  const path = './src/data/lore/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[loreName]) return parsedData[loreName];
  return '';
}
