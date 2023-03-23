import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class CaloricBalanceFactorRepository {
  private readonly logger = new Logger(CaloricBalanceFactorRepository.name);

  constructor(private readonly prisma: PrismaService) {}
}
