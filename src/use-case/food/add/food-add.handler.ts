import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FoodAddCommand } from "./food-add.command";

@CommandHandler(FoodAddCommand)
export class FoodAddHandler 
    implements ICommandHandler<FoodAddCommand>
    {
        constructor() {}
    execute(command: FoodAddCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
    }