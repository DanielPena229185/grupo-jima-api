import { Test, TestingModule } from '@nestjs/testing';
import { TiendaController } from './tienda.controller';

describe('TiendaController', () => {
  let controller: TiendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaController],
    }).compile();

    controller = module.get<TiendaController>(TiendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
