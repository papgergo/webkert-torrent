import { Category } from './category';
import { User } from './user';

export interface Torrent {
  id: number;
  uploader: User;
  name: string | 'Anonymous';
  size: string;
  category: Category;
  seeds: number;
  description: string;
  coverImageUrl: string;
  uploadDate: Date;
}
