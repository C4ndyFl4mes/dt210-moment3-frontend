import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IUser } from "../interfaces/user/IUser";
import type { IError } from "../interfaces/IError";
import type { IAuth } from "../interfaces/user/IAuth";
import type { ILogout } from "../interfaces/user/ILogout";
import type { IGuard } from "../interfaces/user/IGuard";


export default function AuthService() {
    const client = Axios.create({
        baseURL: 'http://localhost:5179/api/auth',
        withCredentials: true
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Registrerar en ny användare.
    async function register(auth: IAuth): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.post<IUser>("/register", auth, config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred during registration." };
        }
    }

    // Loggar in en användare.
    async function login(auth: IAuth): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.post<IUser>("/login", auth, config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred during login." };
        }
    }

    // Loggar ut en användare.
    async function logout(): Promise<ILogout | IError> {
        try {
            const res: AxiosResponse<ILogout> = await client.post<ILogout>("/logout", {}, config);
            return handleSuccess<ILogout>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred during logout." };
        }
    }

    // Kollar om användaren är en admin.
    async function guard(): Promise<IGuard | IError> {
        try {
            const res: AxiosResponse<IGuard> = await client.get<IGuard>("/guard", config);
            return handleSuccess<IGuard>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred during guard check." };
        }
    }

    // Hämtar nuvarande inloggade användare.
    async function getCurrentUser(): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.get<IUser>("/me", config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching current user." };
        }
    }

    return { register, login, logout, guard, getCurrentUser };
}