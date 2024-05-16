import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';
import { promises as fs } from 'fs';

const createStorageConfig = (subFolder: string) =>
  multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const destDir = path.join(config.publicPath, subFolder);
      await fs.mkdir(destDir, { recursive: true });
      cb(null, config.publicPath);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, extension);
      const result = path.join(
        subFolder,
        '&' + fileName + '&' + randomUUID() + extension,
      );
      cb(null, result);
    },
  });

export const avatarsUpload = multer({ storage: createStorageConfig('avatar') });
export const imageUpload = multer({ storage: createStorageConfig('image') });
