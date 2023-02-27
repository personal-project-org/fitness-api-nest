import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCaseModule } from './infrastructure/modules/use-case.module';
import { InfrastructureModule } from './infrastructure/modules/infrastructure.module';
import { ApiModule } from './infrastructure/modules/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/infrastructure/gql/schema/schema.gql',
      cors: true,
    }),
    UseCaseModule,
    InfrastructureModule,
    ApiModule,
  ],
})
export class AppModule {}
