import { Controller, Get, Query } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { ApiQuery } from '@nestjs/swagger';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('browsing')
export class BrowsingController {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesystemService,
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
  findAll(
    @Query('path') searchPath: string,
    @Query('hidden') hidden?: boolean,
  ) {
    const restrictedPath = searchPath
      .replace(/(\.\.\/)/g, '')
      .replace(/(\/\/)+/g, '/');

    return this.filesService.ls(
      path.resolve(
        `${this.configService.get<string>('data.path')}${restrictedPath}`,
      ),
      hidden,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }
}
