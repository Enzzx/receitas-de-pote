export type Recipe = {
    Title: string;
    Boxes: RecipeData[];
}

export type RecipeData = {
    Id: number;
    Image: string;
    Title: string;
    Description: string;
    Slug: string;
}

export type UserProfile = {
    Img: string;
    Username: string;
    RecipesCount: number;
}

export type News = {
    Id: number;
    Title: string;
    Caption: string;
    Image: string;
    Topic: string;
    Post_date: string;
    Path: string;
}

export type HttpAccBody = {
    Message: string
    Succesfull: boolean
    Data: string
}

export type HttpProfileBody = {
    Message: string
    Succesfull: boolean
    Data: {
        Profile: UserProfile
        Recipes: RecipeData[]
    }
}