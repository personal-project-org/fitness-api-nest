import { Food as FoodItems } from '@prisma/client';
import { Food } from 'src/api/food/entities/local-model/food.entity';

export const mapDbEntityToDomainEntity = (entity: FoodItems): Food => {
  return new Food(
    entity.id,
    entity.name,
    entity.calories,
    entity.protein,
    entity.carbs,
    entity.fats,
  );
};
