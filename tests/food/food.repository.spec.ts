import { Test, TestingModule } from '@nestjs/testing';
import { FoodApiModule } from 'src/api/food/food-api.module';
import { FoodRepository } from 'src/api/food/repository/food.repository';
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
  });
});
