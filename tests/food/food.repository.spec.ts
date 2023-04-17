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
      const createdFood = foodCreateResult.unwrap();
      expect(foodCreateResult).toBeTruthy();
      expect(foodCreateResult.isOk).toBeTruthy();

      const foodFindResult = await prisma.food.findUnique({
        where: {
          id: createdFood.id,
        },
      });

      expect(foodFindResult).toBeTruthy();
      expect(createdFood.name).toEqual('Soup');
      expect(createdFood.calories).toEqual('100');
      expect(createdFood.protein).toEqual('3');
      expect(createdFood.carbs).toEqual('27');
      expect(createdFood.fats).toEqual('50');
    });
  });

  describe('getAllFoods', async () => {
    it('Should return all foods stored in the repository.', async () => {
      const foodCreateRequest: FoodCreateRequest[] = [
        {
          name: 'Soup',
          calories: '100',
          protein: '3',
          carbs: '27',
          fats: '50',
        },
        {
          name: 'Cake',
          calories: '200',
          protein: '2',
          carbs: '273',
          fats: '90',
        },
        {
          name: 'Chicken Breast',
          calories: '200',
          protein: '29',
          carbs: '9',
          fats: '5',
        },
      ];

      foodCreateRequest.map(async (e) => await foodRepository.create(e));
      const getAllResult = (await foodRepository.getAllFoods()).unwrap();
      expect(getAllResult).toBeTruthy();
      expect(getAllResult).toHaveLength(3);

      getAllResult.map((e) => {
        let { id: _, ...rest } = e;
        console.log(rest);
      });
    });
  });

  describe('deleteFoods', async () => {
    it('Should delete foods within a specified date range.', async () => {});
  });

  describe('updateFood', async () => {
    it('Should update a food name and all other fields', async () => {});
  });
});
