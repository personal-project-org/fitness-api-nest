import { Food } from 'src/api/food/entities/local-model/food.entity';
import { FoodObjectType } from './food.object-type';

export const mapDomainEntityToGqlObjectType = (
  entity: Food,
): FoodObjectType => {
  return {
    id: entity.id,
    name: entity.name,
    calories: entity.calories,
    protein: entity.protein,
    carbs: entity.carbs,
    fats: entity.fats,
  };
};
