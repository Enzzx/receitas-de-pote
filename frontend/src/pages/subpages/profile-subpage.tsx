import ProfileInfo from "../../components/profile-info"
import ProfileRecipesContainer from "../../components/profile-recipes-container"
import user from "../../data-sim/user.json"

export default function ProfileSubPage() {
    return (
        <div id="profile">
            <div id="profile-user">
                <ProfileInfo id={user.profileInfo.id} img={user.profileInfo.img} username={user.profileInfo.username} recipes={user.profileInfo.recipes} news={user.profileInfo.news}/>
                <ProfileRecipesContainer boxes={user.recipes}/>
            </div>
            <div id="profile-sys">
                <p>sair da conta</p>
                <p>apagar conta</p>
            </div>
        </div>
    )
}