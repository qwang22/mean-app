import * as fs from 'fs';
import * as path from 'path';

export default function bindModels(): string[] {
  const pathToModels = path.join(__dirname, '..', 'models');
  let files: string[] = [];
  try {
    files = fs.readdirSync(pathToModels).filter(file => (file.indexOf('.') !== 0 && file.slice(-3) === '.ts'))
      .map(file => {
        require(`${pathToModels}/${file}`);
        return file;
      });
  } catch(err) {
    console.error('error', `unable to bind models ${err}`);
  }

  return files;
}