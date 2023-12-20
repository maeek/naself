import * as fs from 'fs-extra';
import * as path from 'path';
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('compression')
export class CompressionProcessor {
  constructor(private readonly configService: ConfigService) {}

  @Process({
    name: 'compress',
    concurrency: +process.env.COMPRESS_PROCESS_COUNT || 2,
  })
  async compress(
    job: Job<{
      filePath: string;
      type: 'zip' | 'tar';
    }>,
  ): Promise<{ name: string; path: string }> {
    try {
      const filePath = job.data.filePath;
      const type = job.data.type || 'tar';

      await fs.access(filePath, fs.constants.R_OK);
      const fileStat = await fs.stat(filePath);
      if (!fileStat.isDirectory()) throw new Error('Path is a file');

      const archiveName = `${path.basename(
        filePath,
      )}-${crypto.randomUUID()}.${type}`;

      const command = type === 'tar' ? 'tar -cf' : 'zip -r';
      const proc = exec(`${command} ${archiveName} ${filePath}`);
      await new Promise<void>((resolve, reject) => {
        proc.on('exit', (code) => {
          if (code === 0) resolve();
          else reject();
        });
      });

      const archivePath = path.resolve(
        this.configService.get('data.cache'),
        archiveName,
      );
      await fs.ensureFile(archivePath);

      return { name: archiveName, path: archivePath };
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }

  @Process({
    name: 'decompress',
    concurrency: +process.env.COMPRESS_PROCESS_COUNT || 2,
  })
  async decompress(
    job: Job<{
      filePath: string;
    }>,
  ): Promise<void> {
    try {
      const filePath = job.data.filePath;

      await fs.access(filePath, fs.constants.R_OK);
      await fs.access(path.dirname(filePath), fs.constants.W_OK);

      const fileStat = await fs.stat(filePath);
      if (!fileStat.isFile()) throw new Error('Path is a directory');

      const command = filePath.endsWith('.zip') ? 'unzip' : 'tar -xf';
      const proc = exec(`${command} ${filePath}`);
      await new Promise<void>((resolve, reject) => {
        proc.on('exit', (code) => {
          if (code === 0) resolve();
          else reject();
        });
      });

      return;
    } catch (error) {
      throw new Error('File does not exist or is not accessible');
    }
  }
}
