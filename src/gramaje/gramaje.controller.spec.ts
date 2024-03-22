import { Test, TestingModule } from '@nestjs/testing';
import { GramajeController } from './gramaje.controller';

describe('GramajeController', () => {
  let controller: GramajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GramajeController],
    }).compile();

    controller = module.get<GramajeController>(GramajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
