import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { createReadStream } from 'fs-extra';
import * as path from 'path';
import * as mime from 'mime-types';
import { ReadStream } from 'fs';
import { CreateReadStreamOptions } from 'fs/promises';
import { ConfigService } from '@nestjs/config';

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
export class FilesystemService {
  constructor(private readonly configService: ConfigService) {}

  async ls(folder: string, hidden?: boolean) {
    try {
      await fs.access(folder, fs.constants.X_OK | fs.constants.R_OK);
      const dirStat = await fs.stat(folder);
      if (!dirStat.isDirectory()) throw new Error('Path is a file');

      const lsResults = await fs.readdir(folder, { encoding: 'utf-8' });

      const fileResults = await Promise.allSettled(
        lsResults
          .filter((file) => {
            if (hidden) return true;
            return !file.startsWith('.');
          })
          .map(async (file) => this.stat(path.resolve(folder, file))),
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

  async read(
    filePath: string,
    options?: CreateReadStreamOptions,
  ): Promise<ReadStream> {
    try {
      await fs.access(filePath, fs.constants.R_OK);
      const fileStat = await fs.stat(filePath);
      if (!fileStat.isDirectory()) throw new Error('Path is a file');

      return createReadStream(filePath, options);
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  async write(filePath: string, content: Buffer): Promise<void> {
    try {
      const parentDir = path.dirname(filePath);
      const parentDirStat = await fs.stat(parentDir);
      if (!parentDirStat.isDirectory()) throw new Error('Save path is a file');
      await fs.access(parentDir, fs.constants.W_OK);

      await fs.writeFile(filePath, content, { encoding: 'utf-8' });

      return;
    } catch (error) {
      throw new Error('Save path does not exist or is not accessible');
    }
  }

  async delete(filePath: string): Promise<void> {
    try {
      await fs.access(filePath, fs.constants.W_OK);
      const fileStat = await fs.stat(filePath);

      if (fileStat.isDirectory()) {
        await fs.rmdir(filePath, { recursive: true });
      } else {
        await fs.unlink(filePath);
      }
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  async move(
    sourcePath: string,
    destinationFolderPath: string,
  ): Promise<{ path: string }> {
    try {
      await fs.access(sourcePath, fs.constants.W_OK);
      await fs.access(destinationFolderPath, fs.constants.W_OK);

      const destination = path.resolve(
        destinationFolderPath,
        path.basename(sourcePath),
      );

      await fs.rename(sourcePath, destination);

      return { path: destination };
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  async copy(
    sourcePath: string,
    destinationPath: string,
  ): Promise<{ path: string }> {
    try {
      await fs.access(sourcePath, fs.constants.R_OK);
      await fs.access(destinationPath, fs.constants.W_OK);

      const destination = path.resolve(
        destinationPath,
        path.basename(sourcePath),
      );

      await fs.copy(sourcePath, destination, { preserveTimestamps: true });

      return { path: destination };
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  async createFolder(filePath: string, name: string): Promise<void> {
    try {
      await fs.access(filePath, fs.constants.W_OK);
      const parentDirStat = await fs.stat(filePath);
      if (!parentDirStat.isDirectory()) throw new Error('Path is a file');

      const newDirPath = path.resolve(filePath, name);
      await fs.mkdir(newDirPath, { recursive: true });

      return;
    } catch (error) {
      throw new Error('Path does not exist or is not accessible');
    }
  }

  async rename(filePath: string, name: string): Promise<{ path: string }> {
    const newPath = path.resolve(path.dirname(filePath), name);
    return this.move(filePath, newPath);
  }

  async stat(filePath: string): Promise<FileDescriptor> {
    try {
      await fs.access(filePath, fs.constants.R_OK);
      const fileStat = await fs.stat(filePath);

      return {
        name: path.basename(filePath),
        isDirectory: fileStat.isDirectory(),
        mime: fileStat.isDirectory()
          ? 'inode/directory'
          : mime.lookup(filePath) || 'application/octet-stream',
        size: fileStat.size,
        createdAt: Math.floor(fileStat.birthtimeMs),
        modifiedAt: Math.floor(fileStat.mtimeMs),
        isSymLink: fileStat.isSymbolicLink(),
      };
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  async compress(
    filePath: string,
    type: 'zip' | 'tar' = 'tar',
  ): Promise<{ name: string; path: string }> {
    throw new Error('Method not implemented.');
  }

  async decompress(filePath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
