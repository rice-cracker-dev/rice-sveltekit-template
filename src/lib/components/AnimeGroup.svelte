<script lang="ts">
  import type { IAnimeResult } from '@consumet/extensions';
  import type { View } from '.';
  import AnimeGrid from './AnimeGrid.svelte';
  import AnimeList from './AnimeList.svelte';

  export let animes: IAnimeResult[] | null = null;
  export let isLoading = false;
  export let view: View | string = 'grid';
</script>

{#if view === 'grid'}
  <AnimeGrid {animes} {isLoading} />
{:else if view === 'list'}
  <AnimeList {animes} {isLoading} />
{/if}
