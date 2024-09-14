import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { BrowsingController } from './browsing.controller';
import { BullModule } from '@nestjs/bull';
import { Node } from 'src/db/entities/node.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeUpdaterService } from './node-updater.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'compress',
    }),
    TypeOrmModule.forFeature([Node]),
  ],
  controllers: [BrowsingController],
  providers: [FilesystemService, NodeUpdaterService],
})
export class BrowsingModule {}
