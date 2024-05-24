import { createRealmContext } from "@realm/react";
import {
  usersSchema,
  unitsSchema,
  shoppingCategoriesSchema,
  reviewsSchema,
  mealsSchema,
  mealRoutinesSchema,
  ingredientsSchema,
} from "@/models/schemas/Schemas";

export const RealmContext = createRealmContext({
  schema: [
    usersSchema,
    unitsSchema,
    shoppingCategoriesSchema,
    reviewsSchema,
    mealsSchema,
    mealRoutinesSchema,
    ingredientsSchema,
  ],
});
