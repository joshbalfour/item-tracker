import {
    Resolver,
    Query,
    FieldResolver,
    Arg,
    Root,
    Mutation,
    Int,
    ResolverInterface,
} from "type-graphql";

import { Recipe, RecipeInput } from "../entities/recipe";

@Resolver(of => Recipe)
export class RecipeResolver {
    private readonly items: Recipe[] = createRecipeSamples();

    @Query(returns => Recipe, { nullable: true })
    async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
        return await this.items.find(recipe => recipe.title === title);
    }

    @Query(returns => [Recipe], { description: "Get all the recipes from around the world " })
    async recipes(): Promise<Recipe[]> {
        return await this.items;
    }

    @Mutation(returns => Recipe)
    async addRecipe(@Arg("recipe") recipeInput: RecipeInput): Promise<Recipe> {
        const recipe = Object.assign(new Recipe(), {
            description: recipeInput.description,
            title: recipeInput.title,
            ratings: [],
            creationDate: new Date(),
        });
        await this.items.push(recipe);
        return recipe;
    }
}

function createRecipeSamples() {
    return [
        createRecipe({
            description: "Desc 1",
            title: "Recipe 1",
            creationDate: new Date("2018-04-11"),
            ingredients: ["lol"]
        }),
        createRecipe({
            description: "Desc 2",
            title: "Recipe 2",
            creationDate: new Date("2018-04-15"),
            ingredients: ["lol"]

        }),
        createRecipe({
            description: "Desc 3",
            title: "Recipe 3",
            creationDate: new Date(),
            ingredients: ["lol"]

        }),
    ];
}

function createRecipe(recipeData: Partial<Recipe>) {
    return Object.assign(new Recipe(), recipeData);
}