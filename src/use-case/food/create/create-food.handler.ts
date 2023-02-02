import { Result } from "@badrap/result";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FoodCreateRequest, FoodRepository } from "src/core/food/food.repository";
import { CreateFoodCommand } from "./create-food.command";

@CommandHandler(CreateFoodCommand)
export class CreateFoodHandler 
    implements ICommandHandler<CreateFoodCommand>
    {
    constructor(private readonly foodRepository: FoodRepository) {}

    async execute(command: CreateFoodCommand): Promise<any> {
        //Should implement some sort of thing to prevent duplicates

        const foodCreateResult = await this.foodRepository.create(
            {
                name : command.name,
                calories : command.calories,
                protein: command.protein,
                carbs: command.carbs,
                fats: command.fats
            } as FoodCreateRequest
        )

        console.log(JSON.stringify(foodCreateResult,null,2))

        if(foodCreateResult.isErr){
            return Result.err(new RepositoryCreationError())
        }

        const createdFoodWithinRepo = foodCreateResult.unwrap()

        return createdFoodWithinRepo;
    }
    }

    export abstract class FoodCreateErrorResponse extends Error {}

    export class RepositoryCreationError extends FoodCreateErrorResponse {}