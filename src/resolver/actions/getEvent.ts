import fs from 'fs/promises';

export default async function getEvent(input: any) {
  const { data } = input;
  const eventName = data.eventName;
  const path = './src/data/actionEvent/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[eventName]) return parsedData[eventName];
  return '';
}
