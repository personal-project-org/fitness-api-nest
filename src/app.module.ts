import { Module } from '@nestjs/common';
import { UseCaseModule } from './infrastructure/modules/use-case.module';
import { InfrastructureModule } from './infrastructure/modules/infrastructure.module';
import { ApiModule } from './infrastructure/modules/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
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
