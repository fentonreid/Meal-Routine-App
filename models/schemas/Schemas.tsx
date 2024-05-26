import Realm from "realm";

export type ingredients = {
  _id: Realm.BSON.ObjectId;
  creationDate?: Date;
  creatorId?: Realm.BSON.ObjectId;
  isPublic: boolean;
  name: string;
  shoppingCategory: Realm.BSON.ObjectId;
};
export const ingredientsSchema = {
  name: "ingredients",
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

export type mealRoutines = {
  _id: Realm.BSON.ObjectId;
  endDate?: Date;
  mealRoutineState: string;
  meals: Realm.List<mealRoutines_meals>;
  shoppingList: Realm.List<mealRoutines_shoppingList>;
  startDate?: Date;
  userId: Realm.BSON.ObjectId;
};

export const mealRoutinesSchema = {
  name: "mealRoutines",
  properties: {
    _id: "objectId",
    endDate: "date?",
    mealRoutineState: "string",
    meals: "mealRoutines_meals[]",
    shoppingList: "mealRoutines_shoppingList[]",
    startDate: "date?",
    userId: "objectId",
  },
  primaryKey: "_id",
};

export type mealRoutines_meals = {
  day?: string;
  mealId?: unknown;
  mealState?: string;
  mealType?: string;
  review?: unknown;
};

export const mealRoutines_mealsSchema = {
  name: "mealRoutines_meals",
  embedded: true,
  properties: {
    day: "string?",
    mealId: "mixed",
    mealState: "string?",
    mealType: "string?",
    review: "mixed",
  },
};

export type mealRoutines_shoppingList = {
  ingredientId: Realm.BSON.ObjectId;
  isAdded: boolean;
  totalQuantity?: unknown;
  unitId: Realm.BSON.ObjectId;
};

export const mealRoutines_shoppingListSchema = {
  name: "mealRoutines_shoppingList",
  embedded: true,
  properties: {
    ingredientId: "objectId",
    isAdded: "bool",
    totalQuantity: "mixed",
    unitId: "objectId",
  },
};

export type meals = {
  _id: Realm.BSON.ObjectId;
  categories: Realm.List<string>;
  imageURI?: string;
  ingredients: Realm.List<meals_ingredients>;
  instructions: Realm.List<string>;
  isPublic: boolean;
  name?: string;
  subCategories: Realm.List<string>;
};

export const mealsSchema = {
  name: "meals",
  properties: {
    _id: "objectId",
    categories: "string[]",
    imageURI: "string?",
    ingredients: "meals_ingredients[]",
    instructions: "string[]",
    isPublic: "bool",
    name: "string?",
    subCategories: "string[]",
  },
  primaryKey: "_id",
};

export type meals_ingredients = {
  ingredient?: string;
  ingredientId: Realm.BSON.ObjectId;
  measure?: string;
  quantity?: unknown;
  unit: Realm.BSON.ObjectId;
};

export const meals_ingredientsSchema = {
  name: "meals_ingredients",
  embedded: true,
  properties: {
    ingredient: "string?",
    ingredientId: "objectId",
    measure: "string?",
    quantity: "mixed",
    unit: "objectId",
  },
};

export type reviews = {
  _id: Realm.BSON.ObjectId;
  additionalInformation?: string;
  effort: number;
  imageURI?: string;
  mealId: Realm.BSON.ObjectId;
  mealRoutineId: Realm.BSON.ObjectId;
  taste: number;
  userId: Realm.BSON.ObjectId;
};

export const reviewsSchema = {
  name: "reviews",
  properties: {
    _id: "objectId",
    additionalInformation: "string?",
    effort: "double",
    imageURI: "string?",
    mealId: "objectId",
    mealRoutineId: "objectId",
    taste: "double",
    userId: "objectId",
  },
  primaryKey: "_id",
};

export type shoppingCategories = {
  _id: Realm.BSON.ObjectId;
  creationDate?: Date;
  creatorId?: users;
  isPublic: boolean;
  shoppingCategory: string;
};

export const shoppingCategoriesSchema = {
  name: "shoppingCategories",
  properties: {
    _id: "objectId",
    creationDate: "date?",
    creatorId: "objectId?",
    isPublic: "bool",
    shoppingCategory: "string",
  },
  primaryKey: "_id",
};

export type units = {
  _id: Realm.BSON.ObjectId;
  baseUnit?: unknown;
  conversionFactor?: units_conversionFactor;
  conversionPossible?: boolean;
  creationDate?: Date;
  creatorId?: users;
  isBaseUnit?: boolean;
  isPublic: boolean;
  system?: string;
  unitDisplayName: string;
  unitName: string;
  unitType: string;
};

export const unitsSchema = {
  name: "units",
  properties: {
    _id: "objectId",
    baseUnit: "mixed",
    conversionFactor: "units_conversionFactor",
    conversionPossible: "bool?",
    creationDate: "date?",
    creatorId: "users",
    isBaseUnit: "bool?",
    isPublic: "bool",
    system: "string?",
    unitDisplayName: "string",
    unitName: "string",
    unitType: "string",
  },
  primaryKey: "_id",
};

export type units_conversionFactor = {
  toImperial: number;
  toMetric: number;
};

export const units_conversionFactorSchema = {
  name: "units_conversionFactor",
  embedded: true,
  properties: {
    toImperial: "double",
    toMetric: "double",
  },
};

export type users = {
  _id: Realm.BSON.ObjectId;
  activeMealRoutineId?: null | Realm.BSON.ObjectID;
  diary: Realm.List<users_diary>;
  username: string;
};

export const usersSchema = {
  name: "users",
  properties: {
    _id: "objectId",
    activeMealRoutineId: "mixed",
    diary: "users_diary[]",
    username: "string",
  },
  primaryKey: "_id",
};

export type users_diary = {
  completionDate: Date;
  mealRoutineId: Realm.BSON.ObjectId;
  startDate: Date;
};

export const users_diarySchema = {
  name: "users_diary",
  embedded: true,
  properties: {
    completionDate: "date",
    mealRoutineId: "objectId",
    startDate: "date",
  },
};
