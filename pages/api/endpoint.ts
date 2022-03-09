// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs/promises');

import { saveData, collectData } from '.';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

const METHODS = { saveData: saveData, collectData: collectData, getItem };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { endpoint, data } = req.body;
  res.status(200).json(await METHODS[endpoint](data));
}

async function getItem(data: any) {
  const itemName = data.itemName;
  const path = './pages/data/items/items.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[itemName]) return parsedData[itemName];
  return '';
}
