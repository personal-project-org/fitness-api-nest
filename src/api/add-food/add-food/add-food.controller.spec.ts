import { Test, TestingModule } from '@nestjs/testing';
import { AddFoodController } from './add-food.controller';

describe('AddFoodController', () => {
  let controller: AddFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddFoodController],
    }).compile();

    controller = module.get<AddFoodController>(AddFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
