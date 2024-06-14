import Realm from "realm";

export type DailyMeal_Meals = {
  mealId?: Meals;
  mealState: string;
  mealType: string;
  review?: unknown;
};

export const DailyMeal_MealsSchema = {
  name: "DailyMeal_Meals",
  embedded: true,
  properties: {
    mealId: "Meals",
    mealState: "string",
    mealType: "string",
    review: "mixed",
  },
};

export type Ingredients = {
  _id: Realm.BSON.ObjectId;
  creationDate?: Date;
  creatorId?: Realm.BSON.ObjectId;
  isPublic: boolean;
  name: string;
  shoppingCategory: Realm.BSON.ObjectId;
};

export const IngredientsSchema = {
  name: "Ingredients",
  properties: {
    _id: "objectId",
    creationDate: "date?",
    creatorId: "objectId?",
    isPublic: "bool",
    name: "string",
    shoppingCategory: "objectId",
  },
  primaryKey: "_id",
};

export type MealRoutine_DailyMeals = {
  date: Date;
  day: string;
  meals: DailyMeal_Meals[];
};

export const MealRoutine_DailyMealsSchema = {
  name: "MealRoutine_DailyMeals",
  embedded: true,
  properties: {
    date: "date",
    day: "string",
    meals: "DailyMeal_Meals[]",
  },
};

export type MealRoutine_ShoppingList = {
  ingredientId: Ingredients;
  isAdded: boolean;
  totalQuantity?: string | number;
  unitId: Units;
};

export const MealRoutine_ShoppingListSchema = {
  name: "MealRoutine_ShoppingList",
  embedded: true,
  properties: {
    ingredientId: "Ingredients",
    isAdded: "bool",
    totalQuantity: "mixed",
    unitId: "Units",
  },
};

export type MealRoutines = {
  _id: Realm.BSON.ObjectId;
  creatorId: Realm.BSON.ObjectId;
  dailyMeals: MealRoutine_DailyMeals[];
  endDate?: Date;
  mealRoutineState: string;
  shoppingList: MealRoutine_ShoppingList[];
  startDate?: Date;
};

export const MealRoutinesSchema = {
  name: "MealRoutines",
  properties: {
    _id: "objectId",
    creatorId: "objectId",
    dailyMeals: "MealRoutine_DailyMeals[]",
    endDate: "date?",
    mealRoutineState: "string",
    shoppingList: "MealRoutine_ShoppingList[]",
    startDate: "date?",
  },
  primaryKey: "_id",
};

export type Meal_Ingredients = {
  ingredient?: string;
  ingredientId: Realm.BSON.ObjectId;
  measure?: string;
  quantity?: unknown;
  unit: Realm.BSON.ObjectId;
};

export const Meal_IngredientsSchema = {
  name: "Meal_Ingredients",
  embedded: true,
  properties: {
    ingredient: "string?",
    ingredientId: "objectId",
    measure: "string?",
    quantity: "mixed",
    unit: "objectId",
  },
};

export type Meals = {
  _id: Realm.BSON.ObjectId;
  categories: string[];
  creationDate?: Date;
  creatorId?: Realm.BSON.ObjectId;
  imageURI?: string;
  ingredients: Meal_Ingredients[];
  instructions: string[];
  isPublic: boolean;
  name?: string;
  subCategories: string[];
};

export const MealsSchema = {
  name: "Meals",
  properties: {
    _id: "objectId",
    categories: "string[]",
    creationDate: "date?",
    creatorId: "objectId?",
    imageURI: "string?",
    ingredients: "Meal_Ingredients[]",
    instructions: "string[]",
    isPublic: "bool",
    name: "string?",
    subCategories: "string[]",
  },
  primaryKey: "_id",
};

export type Reviews = {
  _id: Realm.BSON.ObjectId;
  additionalInformation?: string;
  creatorId: Realm.BSON.ObjectId;
  effort: number;
  imageURI?: string;
  mealId: Realm.BSON.ObjectId;
  mealRoutineId: Realm.BSON.ObjectId;
  taste: number;
  creationDate: Date;
  makeAgain: boolean;
};

export const ReviewsSchema = {
  name: "Reviews",
  properties: {
    _id: "objectId",
    additionalInformation: "string?",
    creatorId: "objectId",
    effort: "double",
    imageURI: "string?",
    mealId: "objectId",
    mealRoutineId: "objectId",
    taste: "double",
    creationDate: "date",
    makeAgain: "bool",
  },
  primaryKey: "_id",
};

export type ShoppingCategories = {
  _id: Realm.BSON.ObjectId;
  creationDate?: Date;
  creatorId?: Realm.BSON.ObjectId;
  isPublic: boolean;
  shoppingCategory: string;
};

export const ShoppingCategoriesSchema = {
  name: "ShoppingCategories",
  properties: {
    _id: "objectId",
    creationDate: "date?",
    creatorId: "objectId?",
    isPublic: "bool",
    shoppingCategory: "string",
  },
  primaryKey: "_id",
};

export type Unit_ConversionFactor = {
  toImperial: number;
  toMetric: number;
};

export const Unit_ConversionFactorSchema = {
  name: "Unit_ConversionFactor",
  embedded: true,
  properties: {
    toImperial: "double",
    toMetric: "double",
  },
};

export type Units = {
  _id: Realm.BSON.ObjectId;
  baseUnit?: unknown;
  conversionFactor?: Unit_ConversionFactor;
  conversionPossible?: boolean;
  creationDate?: Date;
  creatorId?: Realm.BSON.ObjectId;
  isBaseUnit?: boolean;
  isPublic: boolean;
  system?: string;
  unitDisplayName: string;
  unitName: string;
  unitType: string;
};

export const UnitsSchema = {
  name: "Units",
  properties: {
    _id: "objectId",
    baseUnit: "mixed",
    conversionFactor: "Unit_ConversionFactor",
    conversionPossible: "bool?",
    creationDate: "date?",
    creatorId: "objectId?",
    isBaseUnit: "bool?",
    isPublic: "bool",
    system: "string?",
    unitDisplayName: "string",
    unitName: "string",
    unitType: "string",
  },
  primaryKey: "_id",
};

export type User_Diary = {
  completionDate: Date;
  mealRoutineId: Realm.BSON.ObjectId;
  startDate: Date;
};

export const User_DiarySchema = {
  name: "User_Diary",
  embedded: true,
  properties: {
    completionDate: "date",
    mealRoutineId: "objectId",
    startDate: "date",
  },
};

export type Users = {
  _id: Realm.BSON.ObjectId;
  activeMealRoutineId?: MealRoutines;
  diary: User_Diary[];
  username: string;
};

export const UsersSchema = {
  name: "Users",
  properties: {
    _id: "objectId",
    activeMealRoutineId: "MealRoutines",
    diary: "User_Diary[]",
    username: "string",
  },
  primaryKey: "_id",
};
