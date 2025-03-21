export interface Comment {
    id?: number;
    post_id: number;
    user_id: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    username: string;

}