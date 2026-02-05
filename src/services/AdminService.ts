import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IUser } from "../interfaces/user/IUser";
import type { IError } from "../interfaces/IError";
import type { IUserBanned } from "../interfaces/user/IUserBanned";
import type { IPostDeleted } from "../interfaces/post/IPostDeleted";
import type { IThreadDeleted } from "../interfaces/thread/IThreadDeleted";

export default function AdminService() {
    const client = Axios.create({
        baseURL: 'http://localhost:5179/api/admin',
        withCredentials: true
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Hämtar alla användare.
    async function getAllUsers(): Promise<Array<IUser> | IError> {
        try {
            const res: AxiosResponse<Array<IUser>> = await client.get<Array<IUser>>("/users/all", config);
            return handleSuccess<Array<IUser>>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching users." };
        }
    }

    // Raderar en användare.
    async function deleteUser(userId: number): Promise<IUserBanned | IError> {
        try {
            const res: AxiosResponse<IUserBanned> = await client.delete<IUserBanned>(`/ban/${userId}`, config);
            return handleSuccess<IUserBanned>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while deleting user." };
        }
    }

    // Raderar ett inlägg.
    async function deletePost(postId: number): Promise<IPostDeleted | IError> {
        try {
            const res: AxiosResponse<IPostDeleted> = await client.delete<IPostDeleted>(`/post/${postId}`, config);
            return handleSuccess<IPostDeleted>(res);
        } catch (error: unknown) {
            console.log(error); 
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while deleting post." };
        }
    }

    // Raderar en tråd.
    async function deleteThread(threadId: number): Promise<IThreadDeleted | IError> {
        try {
            const res: AxiosResponse<IThreadDeleted> = await client.delete<IThreadDeleted>(`/thread/${threadId}`, config);
            return handleSuccess<IThreadDeleted>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while deleting thread." };
        }
    }

    return { getAllUsers, deleteUser, deletePost, deleteThread };
}