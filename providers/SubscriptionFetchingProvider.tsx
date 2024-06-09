import { RealmProvider, useUser } from "@realm/react";
import * as Schema from "@/models/schemas/Schemas";
import { OpenRealmBehaviorType } from "realm";
import MainNavigationProvider from "./MainNavigationProvider";
import { ObjectId } from "bson";

const SubscriptionFetchingProvider = () => {
  const user = useUser();
  console.log("USER LOGGED IN: SUBSCRIPTION FETCHED: ", user!.id);

  return (
    <RealmProvider
      schema={[
        Schema.UsersSchema,
        Schema.User_DiarySchema,
        Schema.UnitsSchema,
        Schema.Unit_ConversionFactorSchema,
        Schema.ShoppingCategoriesSchema,
        Schema.ReviewsSchema,
        Schema.MealsSchema,
        Schema.Meal_IngredientsSchema,
        Schema.MealRoutinesSchema,
        Schema.MealRoutine_DailyMealsSchema,
        Schema.DailyMeal_MealsSchema,
        Schema.MealRoutine_ShoppingListSchema,
        Schema.IngredientsSchema,
      ]}
      sync={{
        user: user,
        flexible: true,
        newRealmFileBehavior: {
          type: OpenRealmBehaviorType.DownloadBeforeOpen,
        },
        existingRealmFileBehavior: {
          type: OpenRealmBehaviorType.DownloadBeforeOpen,
        },

        // Add initial subscriptions to sync a preferred subset of data to the device
        initialSubscriptions: {
          rerunOnOpen: true,
          update: (mutableSubs, realm) => {
            console.log("HERE???");
            mutableSubs.add(
              realm
                .objects("Users")
                .filtered("_id == $0", new ObjectId(user!.id))
            );

            mutableSubs.add(
              realm
                .objects("Ingredients")
                .filtered(
                  "isPublic == true || creatorId == $0",
                  new ObjectId(user!.id)
                )
            );

            mutableSubs.add(
              realm
                .objects("MealRoutines")
                .filtered("creatorId == $0", new ObjectId(user!.id))
            );

            mutableSubs.add(
              realm
                .objects("Meals")
                .filtered(
                  "isPublic == true || creatorId == $0",
                  new ObjectId(user!.id)
                )
            );

            mutableSubs.add(
              realm
                .objects("ShoppingCategories")
                .filtered(
                  "isPublic == true || creatorId == $0",
                  new ObjectId(user!.id)
                )
            );

            mutableSubs.add(
              realm
                .objects("Units")
                .filtered(
                  "isPublic == true || creatorId == $0",
                  new ObjectId(user!.id)
                )
            );

            mutableSubs.add(
              realm
                .objects("Reviews")
                .filtered("creatorId == $0", new ObjectId(user!.id))
            );

            console.log(realm.objects("Reviews").length);
          },
        },
        onError: (_, error) => {
          // Replace this with a preferred logger in production.
          console.error("Error with realm provider wrapper: ", error.message);
        },
      }}
    >
      <MainNavigationProvider />
    </RealmProvider>
  );
};

export default SubscriptionFetchingProvider;
