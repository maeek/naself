import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as mime from 'mime-types';
import { FileDescriptor, FilesImplementation } from './files.interfaces';

@Injectable()
export class FilesService implements FilesImplementation {
  async ls(folder: string, hidden?: boolean) {
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
      throw new Error('Folder does not exist or is not accessible');
    }
  }

  async read(filePath: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }

  async write(filePath: string, content: Buffer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(filePath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async move(sourcePath: string, destinationPath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async copy(sourcePath: string, destinationPath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async createFolder(filePath: string, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async rename(filePath: string, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async stat(filePath: string): Promise<FileDescriptor> {
    throw new Error('Method not implemented.');
  }

  async compress(
    filePath: string,
    type?: 'zip' | 'tar',
  ): Promise<{ archivePath: `${string}.zip` | `${string}.tar` }> {
    throw new Error('Method not implemented.');
  }

  async decompress(filePath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
