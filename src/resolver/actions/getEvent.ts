import fs from 'fs/promises';

export default async function getEvent(input: any) {
  const { data } = input;
  const eventName = data.eventName;
  const path = './src/data/actionEvent/index.json';
  console.log('123');
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  console.log(input);
  console.log(parsedData[eventName]);
  if (parsedData[eventName]) return parsedData[eventName];
  return '';
}
