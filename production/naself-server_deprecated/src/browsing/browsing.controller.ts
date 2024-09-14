import { Controller, Get, Query } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { ApiQuery } from '@nestjs/swagger';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Node } from 'src/db/entities/node.entity';
import { NodeUpdaterService } from './node-updater.service';

@Controller('browsing')
export class BrowsingController {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesystemService,
    private readonly nodeUpdaterService: NodeUpdaterService,
    @InjectRepository(Node) private nodesRepository: Repository<Node>,
  ) {}

  @ApiQuery({
    name: 'path',
    type: String,
    description: 'Path to the directory',
  })
  @ApiQuery({
    name: 'hidden',
    type: Boolean,
    description: 'Show hidden files',
    required: false,
  })
  @Get()
  async findAll(
    @Query('path') searchPath: string,
    @Query('hidden') hidden?: boolean,
  ) {
    if (searchPath.includes('\0')) {
      throw new Error('Invalid path provided');
    }

    const restrictedPath = searchPath
      .replace(/(\.\.\/)/g, '')
      .replace(/(\/\/)+/g, '/');

    const dirPath = path.join(
      this.configService.get<string>('data.path'),
      restrictedPath,
    );

    if (!dirPath.startsWith(this.configService.get<string>('data.path'))) {
      throw new Error('Invalid path provided');
    }

    const files = await this.filesService.ls(dirPath, hidden);

    const metadata = this.nodeUpdaterService.index(dirPath, files.children);

    return Promise.allSettled([files, metadata]).then((results) => {
      const [filesResult, metadataResult] = results;

      if (filesResult.status === 'rejected') {
        throw filesResult.reason;
      }

      if (metadataResult.status === 'rejected') {
        throw metadataResult.reason;
      }

      const filesData = filesResult.value;
      const metadataData = metadataResult.value;

      return {
        ...filesData,
        ...metadataData.find((node) => node.path === dirPath),
        children: metadataData,
      };
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }
}
