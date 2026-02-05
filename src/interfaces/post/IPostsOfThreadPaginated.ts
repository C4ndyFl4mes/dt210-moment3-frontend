import type { IPagination } from "../IPagination";
import type { IPost } from "./IPost";

export interface IPostsOfThreadPaginated {
    pagination: IPagination;
    posts: Array<IPost>;
}