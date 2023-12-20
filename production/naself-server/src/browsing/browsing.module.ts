import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { BrowsingController } from './browsing.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'compress',
    }),
  ],
  controllers: [BrowsingController],
  providers: [FilesystemService],
})
export class BrowsingModule {}
