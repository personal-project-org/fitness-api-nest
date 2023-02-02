import { Module } from '@nestjs/common';
import { FoodRepository } from 'src/api/food/repository/food.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, FoodRepository],
  exports: [PrismaService, FoodRepository],
})
export class PrismaModule {}
