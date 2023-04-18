import { Test, TestingModule } from '@nestjs/testing';
import { FoodApiModule } from '../../src/api/food/food-api.module';
import {
  FoodCreateRequest,
  FoodRepository,
  FoodUpdateRequestData,
} from '../../src/api/food/repository/food.repository';
import { PrismaModule } from '../../src/infrastructure/prisma/prisma.module';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service';

describe('FoodRepository', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let foodRepository: FoodRepository;

  jest.setTimeout(99999);

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

  afterEach(async () => {
    await prisma.food.deleteMany({});
  });

  describe('createFood', () => {
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

  describe('getAllFoods', () => {
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

      await foodRepository.create(foodCreateRequest[0]);
      await foodRepository.create(foodCreateRequest[1]);
      await foodRepository.create(foodCreateRequest[2]);

      // await foodCreateRequest.map(async (e) => await foodRepository.create(e));
      const getAllResult = (await foodRepository.getAllFoods()).unwrap();
      expect(getAllResult).toBeTruthy();
      expect(getAllResult).toHaveLength(3);
      expect(getAllResult[0].name).toEqual('Soup');
      expect(getAllResult[1].name).toEqual('Cake');
      expect(getAllResult[2].name).toEqual('Chicken Breast');
    });
  });

  describe('deleteFoods', () => {
    it('Should delete specified foods.', async () => {
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

      await foodRepository.create(foodCreateRequest[0]);
      await foodRepository.create(foodCreateRequest[1]);
      await foodRepository.create(foodCreateRequest[2]);
      const getAllResult = (await foodRepository.getAllFoods()).unwrap();
      const ids = getAllResult.map((e) => e.id);

      const deleteManyResult = (await foodRepository.deleteMany(ids)).unwrap();
      expect(deleteManyResult).toBeTruthy();
      expect(deleteManyResult).toBe(3);

      const getAllResultPostDelete = (
        await foodRepository.getAllFoods()
      ).unwrap();
      expect(getAllResultPostDelete).toHaveLength(0);
    });
  });

  describe('updateFood', () => {
    it('Should update a food name and all other fields', async () => {
      const foodCreateRequest: FoodCreateRequest = {
        name: 'Soup',
        calories: '100',
        protein: '3',
        carbs: '27',
        fats: '50',
      };

      const foodCreateResult = await foodRepository.create(foodCreateRequest);

      const foodUpdateRequest: FoodUpdateRequestData = {
        id: foodCreateResult.unwrap().id,
        name: 'Beef Soup',
        calories: '200',
        protein: '6',
        carbs: '54',
        fats: '100',
      };

      await foodRepository.update(foodUpdateRequest);

      const postUpdateFood = await prisma.food.findUnique({
        where: {
          id: foodCreateResult.unwrap().id,
        },
      });

      expect(postUpdateFood.id).toEqual(foodCreateResult.unwrap().id);
      expect(postUpdateFood.name).toEqual('Beef Soup');
      expect(postUpdateFood.calories).toEqual('200');
      expect(postUpdateFood.protein).toEqual('6');
      expect(postUpdateFood.carbs).toEqual('54');
      expect(postUpdateFood.fats).toEqual('100');
    });
  });
});
