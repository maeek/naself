import { Test, TestingModule } from '@nestjs/testing';
import { BrowsingController } from './browsing.controller';
import { FilesystemService } from './filesystem.service';

describe('FilesController', () => {
  let controller: BrowsingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrowsingController],
      providers: [FilesystemService],
    }).compile();

    controller = module.get<BrowsingController>(BrowsingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
