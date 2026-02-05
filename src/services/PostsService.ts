import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IPost } from "../interfaces/post/IPost";
import type { IError } from "../interfaces/IError";
import type { IPostsOfThreadPaginated } from "../interfaces/post/IPostsOfThreadPaginated";
import type { IPostDeleted } from "../interfaces/post/IPostDeleted";
import type { IMessage } from "../interfaces/post/IMessage";
import type { IPostUpdate } from "../interfaces/post/IPostUpdate";

export default function PostsService() {
    const client = Axios.create({
        baseURL: 'http://localhost:5179/api/posts',
        withCredentials: true
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Hämtar alla inlägg.
    async function getAll(): Promise<Array<IPost> | IError> {
        try {
            const res: AxiosResponse<Array<IPost>> = await client.get<Array<IPost>>("/all", config);
            return handleSuccess<Array<IPost>>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching posts." };
        }
    }

    // Hämta inlägg av tråd som är paginerade.
    async function getPostsOfThread(threadId: number, currentPage: number, perPage: number): Promise<IPostsOfThreadPaginated | IError> {
        try {
            const res: AxiosResponse<IPostsOfThreadPaginated> = await client.get<IPostsOfThreadPaginated>(`/thread/${threadId}?currentPage=${currentPage}&perPage=${perPage}`, config);
            return handleSuccess<IPostsOfThreadPaginated>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching posts of thread." };
         }
    }

    // Skicka inlägg till tråd.
    async function sendPostToThread(threadId: number, message: string): Promise<IPost | IError> {
        try {
            const messageData: IMessage = { message };
            const res: AxiosResponse<IPost> = await client.post<IPost>(`/thread/${threadId}`, messageData, config);
            return handleSuccess<IPost>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while sending post to thread." };
        }
    }

    // Ändra inlägg.
    async function editPost(postId: number, message: string): Promise<IPost | IError> {
        try {
            const updateData: IPostUpdate = { postId, message };
            const res: AxiosResponse<IPost> = await client.put<IPost>(`/post/${postId}`, updateData, config);
            return handleSuccess<IPost>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while editing post." };
        }
    }

    // Ta bort inlägg.
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

    return { getAll, getPostsOfThread, sendPostToThread, editPost, deletePost };
}