import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ExerciseResolver } from './exercise-api.resolver';

@Module({
  imports: [CqrsModule],
  providers: [ExerciseResolver, ConfigService],
})
export class ExerciseApiModule {}
