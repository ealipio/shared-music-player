import { promises as fs } from 'fs';

export default async function readFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read file', error);
  }
}
