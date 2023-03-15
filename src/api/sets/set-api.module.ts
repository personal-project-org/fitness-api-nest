import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SetResolver } from './set-api.resolver';

@Module({
  imports: [CqrsModule],
  providers: [SetResolver, ConfigService],
})
export class SetApiModule {}
