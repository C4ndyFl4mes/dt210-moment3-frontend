import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IError } from "../interfaces/IError";
import type { IThread } from "../interfaces/thread/IThread";
import type { IThreadNew } from "../interfaces/thread/IThreadNew";
import type { IThreadUpdated } from "../interfaces/thread/IThreadUpdated";
import type { IThreadDeleted } from "../interfaces/thread/IThreadDeleted";
import type { IThreadCreated } from "../interfaces/thread/IThreadCreated";

export default function ThreadService() {
    const client = Axios.create({
        baseURL: 'http://localhost:5179/api/threads',
        withCredentials: true
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Hämtar alla trådar.
    async function getAll(): Promise<Array<IThread> | IError> {
        try {
            const res: AxiosResponse<Array<IThread>> = await client.get<Array<IThread>>("/all", config);
            return handleSuccess<Array<IThread>>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching threads." };
        }
    }

    // Hämta en tråd.
    async function getOne(threadId: number): Promise<IThread | IError> {
        try {
            const res: AxiosResponse<IThread> = await client.get<IThread>(`/thread/${threadId}`, config);
            return handleSuccess<IThread>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while fetching thread." };
        }
    }

    // Skapa en tråd.
    async function createThread(thread: IThreadNew): Promise<IThreadCreated | IError> {
        try {
            const res: AxiosResponse<IThreadCreated> = await client.post<IThreadCreated>("/thread/new", thread, config);
            return handleSuccess<IThreadCreated>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while creating thread." };
        }
    }

    // Ändra en tråd.
    async function updateThread(threadId: number, thread: IThreadNew): Promise<IThreadUpdated | IError> {
        try {
            const res: AxiosResponse<IThreadUpdated> = await client.put<IThreadUpdated>(`/thread/${threadId}`, thread, config);
            return handleSuccess<IThreadUpdated>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while updating thread." };
        }
    }

    // Radera en tråd.
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


    return { getAll, getOne, createThread, updateThread, deleteThread };
}