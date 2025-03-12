import ProfileInfo from "../../components/profile-info"
import ProfileRecipesContainer from "../../components/profile-recipes-container"
import user from "../../data-sim/user.json"

export default function ProfileSubPage() {
    return (
        <div id="profile">
            <ProfileInfo img={user.profileInfo.img} username={user.profileInfo.username} recipesCount={user.profileInfo.recipesCount} />
            <ProfileRecipesContainer boxes={user.profileInfo.recipesBox}/>
        </div>
    )
}