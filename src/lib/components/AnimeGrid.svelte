<script lang="ts">
  import type { IAnimeResult } from '@consumet/extensions';
  import AnimeCard from './AnimeCard.svelte';

  export let animes: IAnimeResult[] | null = null;
  export let isLoading = false;
</script>

<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  {#if animes && !isLoading}
    {#each animes as anime}
      <AnimeCard {anime} />
    {/each}
  {/if}

  {#if isLoading}
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(20) as _}
      <div class="placeholder aspect-[5/8] h-full w-full animate-pulse" />
    {/each}
  {/if}
</div>
