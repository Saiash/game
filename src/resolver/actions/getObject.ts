import fs from 'fs/promises';

export default async function getObject(input: any) {
  const { data } = input;
  const objectName = data.objectName;
  const path = './src/data/objects/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[objectName]) return parsedData[objectName];
  return '';
}
