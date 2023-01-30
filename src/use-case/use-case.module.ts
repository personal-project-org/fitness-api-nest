import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateFoodHandler } from './food/create/create-food.handler';


@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateFoodHandler,
    Logger
  ],
})
export class UseCaseModule {}