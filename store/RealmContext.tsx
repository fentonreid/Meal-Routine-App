import { createRealmContext } from "@realm/react";
import {
  usersSchema,
  unitsSchema,
  shoppingCategoriesSchema,
  reviewsSchema,
  mealsSchema,
  mealRoutinesSchema,
  ingredientsSchema,
  users_diarySchema,
  units_conversionFactorSchema,
  meals_ingredientsSchema,
  mealRoutines_shoppingListSchema,
  mealRoutines_mealsSchema,
} from "@/models/schemas/Schemas";

export const RealmContext = createRealmContext({
  schema: [
    usersSchema,
    users_diarySchema,
    unitsSchema,
    units_conversionFactorSchema,
    shoppingCategoriesSchema,
    reviewsSchema,
    mealsSchema,
    meals_ingredientsSchema,
    mealRoutinesSchema,
    mealRoutines_mealsSchema,
    mealRoutines_shoppingListSchema,
    ingredientsSchema,
  ],
});
