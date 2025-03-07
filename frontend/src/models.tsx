export type HttpAccBody = {
    Message: string
    Succesfull: boolean
    Data: string
}

export type Recipe = {
    title: string;
    boxes: RecipeData[];
}

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    caption: string;
    rate: number;
    path: string;
}

export type UserProfile = {
    id: number;
    img: string;
    username: string;
    recipes: number;
    news: number;
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