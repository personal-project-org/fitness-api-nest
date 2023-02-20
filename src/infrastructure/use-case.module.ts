import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from '../api/food/use-cases/create/create-food.handler';
import { DeleteFoodHandler } from 'src/api/food/use-cases/delete/delete-food.handler';
import { GetAllFoodHandler } from 'src/api/food/use-cases/get-all-foods/get-all.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [CreateFoodHandler, DeleteFoodHandler, GetAllFoodHandler, Logger],
})
export class UseCaseModule {}
