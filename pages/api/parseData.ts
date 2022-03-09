// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs/promises');

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(await collectData());
}

export const collectData = async () => {
  const folder = './pages/data/';
  const data = {};
  const types = ['actions', 'info', 'nodes', 'events', 'scenes'];
  for (const type of types) {
    const files = await fs.readdir(folder + type + '/_current/');
    const sceneData: any = [];
    for (const file of files) {
      const fileData = await fs.readFile(
        folder + type + '/_current/' + file,
        'utf8'
      );
      sceneData.push(fileData);
    }
    data[type] = JSON.parse(sceneData);
  }
  return data;
};
