export interface Post{
    id?: number;
    topic_id: number;
    user_id: number;
    author: string;
    topic:string;
    title: string;
    description: string;
    comments_id?: number[];
    createdAt?: Date;
    updatedAt?: Date;  
}