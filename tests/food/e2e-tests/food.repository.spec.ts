import { Test, TestingModule } from '@nestjs/testing';
import { Food } from 'src/api/food/entities/local-model/food.entity';
import { FoodApiModule } from 'src/api/food/food-api.module';
import {
  FoodCreateRequest,
  FoodRepository,
} from 'src/api/food/repository/food.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

describe('FoodRepository', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let foodRepository: FoodRepository;

  //Why: Emulates the NestJS runtime before a test, like a fake main.ts
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule, FoodApiModule],
    }).compile();

    module = await module.init();

    foodRepository = module.get<FoodRepository>(FoodRepository);
    expect(foodRepository).toBeDefined();

    prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeDefined();
  });

  describe('createFood', async () => {
    it('Should create a new food successfully when correctly called', async () => {
      const foodCreateRequest: FoodCreateRequest = {
        name: 'Soup',
        calories: '100',
        protein: '3',
        carbs: '27',
        fats: '50',
      };
      const foodCreateResult = await foodRepository.create(foodCreateRequest);
      expect(foodCreateResult).toBeTruthy();
      expect(foodCreateResult.isOk).toBeTruthy();

      const foodFindResult = await prisma.food.findUnique({
        where: {
          name: 'Soup',
        },
      });

      const createdFood = foodCreateResult.unwrap();

      expect(createdFood.name).toEqual('Soup');
      expect(createdFood.calories).toEqual('100');
      expect(createdFood.protein).toEqual('3');
      expect(createdFood.carbs).toEqual('27');
      expect(createdFood.fats).toEqual('50');
    });
  });
});
