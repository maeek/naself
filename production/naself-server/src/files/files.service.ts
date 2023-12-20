import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as mime from 'mime-types';

export interface FileDescriptor {
  name: string;
  isDirectory: boolean;
  mime: string;
  size: number;
  createdAt: number;
  modifiedAt: number;
  isSymLink: boolean;
}

@Injectable()
export class FilesService {
  async list(folder: string, hidden?: boolean) {
    try {
      const dirStat = await fs.stat(folder);
      if (!dirStat.isDirectory()) throw new Error('Path is a file');
      await fs.access(folder, fs.constants.X_OK | fs.constants.R_OK);

      const lsResults = await fs.readdir(folder, { encoding: 'utf-8' });

      const fileResults = await Promise.allSettled(
        lsResults
          .filter((file) => {
            if (hidden) return true;
            return !file.startsWith('.');
          })
          .map(async (file) => {
            const stats = await fs.stat(path.resolve(folder, file));

            return {
              name: file,
              isDirectory: stats.isDirectory(),
              mime: stats.isDirectory()
                ? 'inode/directory'
                : mime.lookup(file) || 'application/octet-stream',
              size: stats.size,
              createdAt: Math.floor(stats.birthtimeMs),
              modifiedAt: Math.floor(stats.mtimeMs),
              isSymLink: stats.isSymbolicLink(),
            } as FileDescriptor;
          }),
      );

      const files = fileResults
        .filter(
          (result): result is PromiseFulfilledResult<FileDescriptor> =>
            result.status === 'fulfilled',
        )
        .map((result) => result.value);

      return {
        name: path.basename(folder),
        size: dirStat.size,
        createdAt: Math.floor(dirStat.birthtimeMs),
        modifiedAt: Math.floor(dirStat.mtimeMs),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        total: files.length,
        children: files,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  inspect(filePath: string) {
    return `This action returns a #${id} file`;
  }

  create(filePath: string, contents: unknown) {
    return `This action creates a new file`;
  }
}
