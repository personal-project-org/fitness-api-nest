import { Result } from "@badrap/result";
import { Food } from "./food.entity";

export abstract class FoodRepository {
    abstract create(
        req: FoodCreateRequest
    ): Promise<Result<Food,FoodRepositoryErrorResponse>>

    abstract getAllFoods(
    ): Promise<Result<Food,FoodRepositoryErrorResponse>>

}

export interface FoodCreateRequest {
    name: string;
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
}

export abstract class FoodRepositoryErrorResponse extends Error {}

export class UnknownError extends FoodRepositoryErrorResponse {}