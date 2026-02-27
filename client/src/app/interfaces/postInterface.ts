import { IAuthor } from "./autherInterface";
import { IComment } from "./commentInterface";
import { IUser } from "./userInterface";

export interface IPost {
	_id: string;
	title: string;
	content: string;
	imageUrl?: string | null;
	author?: IAuthor | null;
	createdAt?: Date;
	likes?: number;
	comments?: IComment[] | null;
	isLiked?: boolean
	likedBy?: IUser
}