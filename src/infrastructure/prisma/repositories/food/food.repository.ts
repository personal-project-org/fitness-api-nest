import { Result } from "@badrap/result";
import { Injectable, Logger } from "@nestjs/common";
import { Food } from "src/core/food/food.entity";
import { FoodCreateRequest, FoodRepository, FoodRepositoryErrorResponse, UnknownError } from "src/core/food/food.repository";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class FoodRepositoryImpl implements FoodRepository {

    //Why:
    private readonly logger = new Logger(FoodRepository.name)

    constructor(private readonly prisma: PrismaService) {}

    async create(req: FoodCreateRequest): Promise<Result<Food, FoodRepositoryErrorResponse>> {
        try {
            const entity = await this.prisma.food.create({
                data:req
            })
        }
        catch (e) {
            this.logger.error(e);
            return Result.err(new UnknownError())
        }
    }
    getAllFoods(): Promise<Result<Food, FoodRepositoryErrorResponse>> {
        throw new Error("Method not implemented.");
    }

}