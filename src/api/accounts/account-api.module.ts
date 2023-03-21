import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountResolver } from './account-api.resolver';

@Module({
  imports: [CqrsModule],
  providers: [AccountResolver, ConfigService],
})
export class AccountApiModule {}
