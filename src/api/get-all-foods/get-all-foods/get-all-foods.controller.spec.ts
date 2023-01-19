import { Test, TestingModule } from '@nestjs/testing';
import { GetAllFoodsController } from './get-all-foods.controller';

describe('GetAllFoodsController', () => {
  let controller: GetAllFoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllFoodsController],
    }).compile();

    controller = module.get<GetAllFoodsController>(GetAllFoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
