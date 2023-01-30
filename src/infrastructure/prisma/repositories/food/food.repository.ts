import { Result } from "@badrap/result";
import { Injectable } from "@nestjs/common";
import { Food } from "src/core/food/food.entity";
import { FoodCreateRequest, FoodRepository, FoodRepositoryErrorResponse } from "src/core/food/food.repository";

@Injectable()
export class FoodRepositoryImpl implements FoodRepository {
    create(req: FoodCreateRequest): Promise<Result<Food, FoodRepositoryErrorResponse>> {
        throw new Error("Method not implemented.");
    }
    getAllFoods(): Promise<Result<Food, FoodRepositoryErrorResponse>> {
        throw new Error("Method not implemented.");
    }

}