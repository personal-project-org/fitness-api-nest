import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CaloricBalanceFactorResolver } from './factor-api.resolver';

@Module({
  imports: [CqrsModule],
  providers: [CaloricBalanceFactorResolver, ConfigService],
})
export class CaloricBalanceFactorApiModule {}
