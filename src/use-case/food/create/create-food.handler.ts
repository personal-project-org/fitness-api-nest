import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateFoodCommand } from "./create-food.command";

@CommandHandler(CreateFoodCommand)
export class CreateFoodHandler 
    implements ICommandHandler<CreateFoodCommand>
    {
        constructor() {}
    execute(command: CreateFoodCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
    }