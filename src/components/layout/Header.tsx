import Navigation from "../base/Navigation";
import UserStore from "../../stores/UserStore";
import profilePic from "../../assets/user-circle-svgrepo-com.svg";
import { observer } from "mobx-react-lite";


export default observer(function Header() {
    return (
        <header className="py-4 shadow">
            <div className="container mx-auto px-2 flex justify-between items-center flex-wrap">
                <p className="font-semibold whitespace-nowrap">Moment 3</p>
                {
                    UserStore.user ? (
                        <div className="flex items-center gap-x-2">
                            <div className="flex flex-col">
                                <span>{UserStore.user.username}</span>
                                <small className="text-end">{UserStore.user.role}</small>
                            </div>
                            <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" onClick={() => UserStore.logOut()} />
                        </div>
                    ) : (
                        <p className="text-gray-600 whitespace-nowrap">Not logged in</p>
                    )
                }
                <Navigation />
            </div>
        </header>
    );
});