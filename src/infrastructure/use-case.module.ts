import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from '../api/food/use-cases/food/create/create-food.handler';
import { DeleteFoodHandler } from 'src/api/food/use-cases/food/delete/delete-food.handler';
import { GetAllFoodHandler } from 'src/api/food/use-cases/food/get-all-foods/get-all.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [CreateFoodHandler, DeleteFoodHandler, GetAllFoodHandler, Logger],
})
export class UseCaseModule {}
