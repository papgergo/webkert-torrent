import { Category } from './category';
import { User } from './user';

export interface Torrent {
  id: string;
  uploader: User;
  name: string;
  size: string;
  category: Category;
  seeds: number;
  description: string;
  coverImageUrl: string;
  uploadDate: Date;
}
