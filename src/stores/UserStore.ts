import { flow, makeAutoObservable } from "mobx";
import type { IUser } from "../interfaces/user/IUser";
import AuthService from "../services/AuthService";
import type { IError } from "../interfaces/IError";
import type { ILogout } from "../interfaces/user/ILogout";

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Sätter användardata i store.
    setUser(user: IUser) {
        this.user = user;
    }

    // Rensar användardata från store.
    clearUser() {
        this.user = null;
    }

    // Loggar ut användaren.
    logOut = flow(function* (this: UserStore) {
        const data: ILogout | IError = yield AuthService().logout();
        if (data && "message" in data) {
            console.error("Logout error: " + data.message);
        } else {
            this.clearUser();
            console.log("User logged out successfully");
        }
    });

    // Hämtar nuvarande inloggad användare och uppdaterar store.
    getCurrentUser = flow(function* (this: UserStore) {
        const data: IUser | IError = yield AuthService().getCurrentUser();
        if (data && "message" in data) {
            console.error("Error fetching user: " + data.message);
            this.user = null;
        } else {
            this.user = data as IUser;
            console.log("Current user: " + this.user.username);
        }
    });
}

export default new UserStore();