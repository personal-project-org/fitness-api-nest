import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    PrismaModule,
    HttpModule,
  ],
  exports: [PrismaModule],
})
export class InfrastructureModule {}