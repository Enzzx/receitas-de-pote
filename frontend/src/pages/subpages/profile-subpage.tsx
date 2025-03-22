import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import ProfileInfo from "../../components/profile-info"
import ProfileRecipesContainer from "../../components/profile-recipes-container"
import { HttpProfileBody, UserProfile, RecipeData } from "../../models"
//import user from "../../data-sim/user.json"

export default function ProfileSubPage() {
    const [profileData, setProfileData] = useState<UserProfile | null>(null)
    const [recipes, setRecipes] = useState<RecipeData[]>([])

    async function getUserData(token: string) {
        const head = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`}
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/profile", head)
            const res: HttpProfileBody = await req.json()

            console.log(res.Message)
            if (res.Succesfull) {
                sessionStorage.setItem("userProfile", JSON.stringify(res.Data))
                setProfileData(res.Data.Profile)
                setRecipes(res.Data.Recipes)

            }
        } catch (e) {
            throw e
        }
    }

    useEffect( () => {
        const userDataStr = sessionStorage.getItem("userProfile")

        if (userDataStr != null) {
            const userData: { Profile: UserProfile, Recipes: RecipeData[] } = JSON.parse(userDataStr)

            setProfileData(userData.Profile)
            setRecipes(userData.Recipes)

        } else {
            const jwt = Cookies.get("jwt")
            if (jwt != undefined) {
                getUserData(jwt)
            }
        }

    }, [])

    return (
        <div id="profile">
            {profileData ? (
                <>
                <ProfileInfo Img={profileData.Img} Username={profileData.Username} RecipesCount={profileData.RecipesCount} />
                <ProfileRecipesContainer boxes={recipes}/>
                </>
            ) : <h1>Carregando perfil...</h1>
            }
        </div>
    )
}