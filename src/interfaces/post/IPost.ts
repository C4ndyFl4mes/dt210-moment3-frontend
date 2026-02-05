export interface IPost {
    postId: number;
    threadId?: number;
    dateTime: string;
    message: string;
    username: string;
}