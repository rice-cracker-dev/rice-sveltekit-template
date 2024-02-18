<script lang="ts">
  import type { PageData } from './$types';
  import AnimeSwiper from '$lib/components/AnimeSwiper.svelte';
  import AnimeGrid from '$lib/components/AnimeRow.svelte';
  import Icon from '@iconify/svelte';

  export let data: PageData;
</script>

<div class="space-y-4">
  <AnimeSwiper animes={data.query.trending.results} />
  <div class="container mx-auto space-y-4">
    <AnimeGrid animes={data.query.popularity.results}>
      <div slot="headerLeft">
        <h3 class="h3 font-semibold">Popular animes</h3>
        <p class="text-surface-600-300-token">Explore our most popular animes.</p>
      </div>
      <a
        slot="headerRight"
        href="/search?sort=popularity"
        class="text-primary-500-400-token btn gap-2 hover:variant-soft-surface"
      >
        Show all
        <Icon icon="ph:caret-double-right" />
      </a>
    </AnimeGrid>
    <AnimeGrid animes={data.query.favorites.results}>
      <div slot="headerLeft">
        <h3 class="h3 font-semibold">Favored by anime lovers</h3>
        <p class="text-surface-600-300-token">Chosen by anime lover around the globe.</p>
      </div>
      <a
        slot="headerRight"
        href="/search?sort=favourites"
        class="text-primary-500-400-token btn gap-2 hover:variant-soft-surface"
      >
        Show all
        <Icon icon="ph:caret-double-right" />
      </a>
    </AnimeGrid>
  </div>
</div>
