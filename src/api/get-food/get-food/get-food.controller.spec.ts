import { Test, TestingModule } from '@nestjs/testing';
import { GetFoodController } from './get-food.controller';

describe('GetFoodController', () => {
  let controller: GetFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetFoodController],
    }).compile();

    controller = module.get<GetFoodController>(GetFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
