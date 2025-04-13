export type RecipeData = {
    Id: number
    Image: string
    Title: string
    Description: string
    Slug: string
}

export type UserProfile = {
    Img: string
    Username: string
    RecipesCount: number
}

export type News = {
    Id: number
    Title: string
    Description: string
    Image: string
    Publication: string
    Topic: string
}


export type HttpNewsBody = {
	Message: string
	Successfull: boolean
	Data: News[]
}

export type HttpAccBody = {
    Message: string
    Successfull: boolean
    Data: string
}

export type HttpProfileBody = {
    Message: string
    Successfull: boolean
    Data: {
        Profile: UserProfile
        Recipes: RecipeData[]
    }
}

export type HttpRecipesBody = {
    Message: string
    Successfull: boolean
    Data: RecipeData[]
}

export type HttpSearchBody = {
    Message: string
    Successfull: boolean
    Data: { Recipes: RecipeData[], News: News[] }
}