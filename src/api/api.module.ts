import { Module } from '@nestjs/common';
import { FoodApiModule } from './food/food-api.module';

@Module({
  imports: [
    FoodApiModule,
  ],
})
export class ApiModule {}