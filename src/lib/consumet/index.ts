import type { ISearch, IAnimeResult, IAnimeInfo, ITitle } from '@consumet/extensions';
import type { IAnilistSearchQuery, SortGroup } from './types';
import { PUBLIC_CONSUMET_API } from '$env/static/public';

export const getEndpointData = async <T>(endpoint: string) => {
  const url = `${PUBLIC_CONSUMET_API}/${endpoint}`;
  const data = await fetch(url).then((res) => res.json());

  return data as T;
};

export const anilistSearch = async (query: IAnilistSearchQuery = {}) => {
  const queryBuilder = new URLSearchParams();
  let url = 'meta/anilist/advanced-search';

  if (Object.keys(query).length > 0) {
    // filter null values
    Object.entries(query)
      .filter(([, value]) => !!value)
      .forEach(([key, value]) => queryBuilder.append(key, JSON.stringify(value)));

    url += `?${queryBuilder.toString()}`;
  }

  return await getEndpointData<ISearch<IAnimeResult>>(url);
};

export const anilistAnimeInfo = async (id: number) => {
  return await getEndpointData<IAnimeInfo>(`meta/anilist/info/${id}`);
};

export const sortGroups: { [s: string]: SortGroup } = {
  popularity: { desc: 'POPULARITY_DESC', asc: 'POPULARITY', label: 'Popularity' },
  trending: { desc: 'TRENDING_DESC', asc: 'TRENDING', label: 'Trending' },
  // updatedAt: { desc: 'UPDATED_AT_DESC', asc: 'UPDATED_AT', label: 'Updated At' },
  // endDate: { desc: 'END_DATE_DESC', asc: 'END_DATE', label: 'End Date' },
  favourites: { desc: 'FAVOURITES_DESC', asc: 'FAVOURITES', label: 'Favourites' },
  score: { desc: 'SCORE_DESC', asc: 'SCORE', label: 'Rating' },
  // startDate: { desc: 'START_DATE_DESC', asc: 'START_DATE', label: 'First aired on' },
  // titleRomaji: { desc: 'TITLE_ROMAJI_DESC', asc: 'TITLE_ROMAJI', label: 'Title (Romaji)' },
  // titleEnglish: { desc: 'TITLE_ENGLISH_DESC', asc: 'TITLE_ENGLISH', label: 'Title (English)' },
  // titleNative: { desc: 'TITLE_NATIVE_DESC', asc: 'TITLE_NATIVE', label: 'Title (Native)' },
  // episodes: { desc: 'EPISODES_DESC', asc: 'EPISODES', label: 'Episodes' },
  // id: { desc: 'ID_DESC', asc: 'ID', label: 'ID' },
};

export const getMainTitle = (title: ITitle | string) => {
  if (typeof title === 'string') {
    return title;
  }

  return title.english ?? title.userPreferred ?? title.romaji ?? title.native ?? 'Unknown';
};
