import type { PageLoad } from './$types';
import { anilistSearch } from '$lib/consumet';

export const load: PageLoad = async () => {
  const [trending, popularity, favorites] = await Promise.all([
    anilistSearch({ sort: 'TRENDING_DESC', perPage: 10 }),
    anilistSearch({ sort: 'POPULARITY_DESC', perPage: 10 }),
    anilistSearch({ sort: 'FAVOURITES_DESC', perPage: 10 }),
  ]);

  return {
    query: { trending, popularity, favorites },
  };
};
