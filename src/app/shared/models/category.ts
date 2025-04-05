export enum CategoryEnum {
  MOVIE = 'movie',
  GAME = 'sports_esports',
  SONG = 'music_note',
  PROGRAM = 'computer',
  BOOK = 'menu_book',
}

export interface Category {
  id: number;
  name: keyof typeof CategoryEnum;
}
