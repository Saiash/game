import fs from 'fs/promises';

export default async function getSkill(input: any) {
  const { data } = input;
  const skillName = data.skillName;
  const path = './src/data/skills/index.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[skillName]) return parsedData[skillName];
  return '';
}
