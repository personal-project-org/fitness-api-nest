import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { FoodResolver } from './food-api.resolver';

@Module({
  imports: [CqrsModule],
  providers: [FoodResolver, ConfigService],
})
export class FoodApiModule {}
