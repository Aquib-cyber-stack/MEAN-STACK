import { IAuthor } from "./autherInterface";

export interface IComment{
	_id ?: string;
	postId ?: string;
	author ?: IAuthor;
	createdAt ?: Date;
	content: string;
}