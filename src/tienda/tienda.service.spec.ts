import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';

describe('TiendaService', () => {
  let service: TiendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
