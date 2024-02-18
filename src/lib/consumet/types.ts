// why did i spend so much time on this
// import type { MediaStatus } from '@consumet/extensions';

export type IType = 'ANIME' | 'MANGA';
export type ISeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
export type IFormat = 'TV' | 'TV_SHORT' | 'OVA' | 'ONA' | 'MOVIE' | 'SPECIAL' | 'MUSIC';
export type IStatus = 'RELEASING' | 'NOT_YET_RELEASED' | 'FINISHED' | 'CANCELLED' | 'HIATUS';

export type Sort =
  | 'POPULARITY_DESC'
  | 'POPULARITY'
  | 'TRENDING_DESC'
  | 'TRENDING'
  | 'UPDATED_AT_DESC'
  | 'UPDATED_AT'
  | 'START_DATE_DESC'
  | 'START_DATE'
  | 'END_DATE_DESC'
  | 'END_DATE'
  | 'FAVOURITES_DESC'
  | 'FAVOURITES'
  | 'SCORE_DESC'
  | 'SCORE'
  | 'TITLE_ROMAJI_DESC'
  | 'TITLE_ROMAJI'
  | 'TITLE_ENGLISH_DESC'
  | 'TITLE_ENGLISH'
  | 'TITLE_NATIVE_DESC'
  | 'TITLE_NATIVE'
  | 'EPISODES_DESC'
  | 'EPISODES'
  | 'ID'
  | 'ID_DESC';

export type SortGroup = { desc: Sort; asc: Sort; label: string };

export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Cars'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mahou Shoujo'
  | 'Mecha'
  | 'Music'
  | 'Mystery'
  | 'Psychological'
  | 'Romance'
  | 'Sci-Fi'
  | 'Slice of Life'
  | 'Sports'
  | 'Supernatural'
  | 'Thriller';

export interface IAnilistSearchQuery {
  query?: string | null;
  type?: IType;
  page?: number;
  perPage?: number;
  season?: ISeason;
  format?: IFormat;
  sort?: Sort;
  genres?: Genre[];
  id?: string;
  year?: string;
  status?: IStatus;
}

// export interface IPaging<T> {
//   currentPage: number;
//   hasNextPage: true;
//   totalPages: number;
//   totalResults: number;
//   results: T[];
// }

// export interface ITitle {
//   romanji?: string;
//   english?: string;
//   native?: string;
//   userPreferred?: string;
// }

// export interface IAnilistResult {
//   id: string;
//   malId: number;
//   title: string | ITitle;
//   status: MediaStatus;
//   image: string;
//   imageHash: string;
//   cover?: string;
//   coverHash?: string;
//   popularity: number;
//   totalEpisodes: number | null;
//   currentEpisodes: number | null;
//   countryOfOrigin?: string;
//   description?: string;
//   genres?: Genre[];
//   rating?: number;
//   color?: string;
//   type?: string;
//   releaseDate?: string;
// }

// export interface IAnilistInfo extends IAnilistResult {

// }
