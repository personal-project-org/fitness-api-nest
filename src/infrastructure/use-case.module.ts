import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from '../api/food/use-cases/create/create-food.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [CreateFoodHandler, Logger],
})
export class UseCaseModule {}
