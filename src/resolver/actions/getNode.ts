import fs from 'fs/promises';

export default async function getNode(input: any) {
  const { data } = input;
  const nodeName = data.nodeName;
  const path = './src/data/nodes/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[nodeName]) return { ...parsedData[nodeName], id: nodeName };
  return '';
}
