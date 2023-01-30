import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCaseModule } from './use-case/use-case.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [  
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/infrastructure/gql/schema/schema.gql',
      cors: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    UseCaseModule,
    InfrastructureModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
