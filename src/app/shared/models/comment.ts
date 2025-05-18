export interface Comment {
  id?: string;
  torrentId: string;
  userId: string;
  text: string;
  commentDate: Date;
}
