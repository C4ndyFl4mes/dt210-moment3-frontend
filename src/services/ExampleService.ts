import Axios, { type AxiosResponse } from "axios";
import type { Boilerplate } from "../interfaces/Boilerplate";
import type { BoilerError } from "../interfaces/BoilerError";

export default function ExampleService() {
    const client = Axios.create({
        baseURL: 'api'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async function get(): Promise<Array<Boilerplate> | BoilerError> {
        try {
            const res: AxiosResponse<Array<Boilerplate>, any, {}> = await client.get<Array<Boilerplate>>("/", config);

            if (res.data && res.data.length > 0) {
                return res.data;
            } else {
                return {
                    error: "Error"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: "Error"
            };
        }
    }

    async function post(boiler: Boilerplate): Promise<Boilerplate | BoilerError> {
        try {
            const res = await client.post<Boilerplate>("/", boiler, config);

            if (res.data) {
                return res.data;
            } else {
                return {
                    error: "Error"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: "Error"
            };
        }
    }

    async function put(boiler: Boilerplate): Promise<Boilerplate | BoilerError> {
        try {
            if (!boiler.id) {
                throw new Error("An ID is needed for updating a todo.");
            }
            const res = await client.put(`/${boiler.id}`, boiler, config);

            if (res.status === 204) {
                return boiler;
            } else {
                return {
                    error: "The todo was not updated."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: "Unable to update todo."
            };
        }
    }

    async function del(boiler: Boilerplate): Promise<Boilerplate | BoilerError> {
        try {
            if (!boiler.id) {
                throw new Error("An ID is needed for deleting a todo.");
            }
            const res = await client.delete(`/${boiler.id}`, config);

            if (res.status === 204) {
                return boiler;
            } else {
                return {
                    error: "The todo was not deleted."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: "Unable to delete todo."
            };
        }
    }

    return { get, post, put, del };
}