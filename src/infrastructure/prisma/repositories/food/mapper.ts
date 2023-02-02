import { Food as FoodItems } from "@prisma/client"
import { Food } from "src/core/food/food.entity"

export const mapDbEntityToDomainEntity = (entity: FoodItems): Food => {
    return new Food(entity.id, entity.name, entity.calories, entity.protein, entity.carbs, entity.fats)
}