import fs from 'fs/promises';

export default async function getScene(input: any) {
  const { data } = input;
  const sceneName = data.sceneName;
  const path = './src/data/scenes/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[sceneName]) return { ...parsedData[sceneName], id: sceneName };
  return '';
}
