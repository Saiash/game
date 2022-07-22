import fs from 'fs/promises';

export default async function getItem(input: any) {
  const { data } = input;
  const itemName = data.itemName;
  const path = './src/data/items/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[itemName]) return parsedData[itemName];
  return '';
}
