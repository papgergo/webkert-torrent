import { Category } from "./category";
import { User } from "./user";

export interface Torrent {
    id: number;
    uploader: User;
    name: string | "Anonymous";
    category: Category;
    description: string;
    coverImageUrl: string;
    createdDate: Date;
}
