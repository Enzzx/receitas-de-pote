export type Recipe = {
    title: string;
    boxes: RecipeData[];
}

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    caption: string;
    slug: string;
}

export type UserProfile = {
    img: string;
    username: string;
    recipesCount: number;
}

export type News = {
    id: number;
    title: string;
    caption: string;
    image: string;
    topic: string;
    post_date: string;
    path: string;
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