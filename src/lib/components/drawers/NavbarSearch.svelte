<script lang="ts">
  import type { IAnimeResult } from '@consumet/extensions';
  import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
  import { slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { anilistSearch, getMainTitle } from '$lib/consumet';
  import { isStrEmpty } from '$lib/validation';
  import { currentDrawerComponent } from '$lib/stores/drawer';
  import Icon from '@iconify/svelte';

  const queryClient = useQueryClient();
  const queryResult = useQuery<IAnimeResult[]>('navbarSearch', async () => {
    if (isStrEmpty(query.searchQuery)) {
      return [];
    }

    return await anilistSearch({ query: query.searchQuery, perPage: 5 }).then((res) => res.results);
  });

  let query = { searchQuery: '' };

  $: {
    // subscribe to query changes
    query;
    queryClient.invalidateQueries('navbarSearch');
  }
</script>

<div class="pointer-events-auto mx-auto w-full space-y-4 lg:max-w-[32rem]">
  <form
    on:submit|preventDefault={() => {
      currentDrawerComponent.open(null);
      goto(`/search?q=${query.searchQuery}`);
    }}
  >
    <input
      tabindex={0}
      type="text"
      class="input"
      placeholder="Search anime"
      bind:value={query.searchQuery}
    />
  </form>

  {#if $queryResult.data && $queryResult.data.length > 0}
    <div
      transition:slide={{ axis: 'y', duration: 150 }}
      class="card variant-filled-surface flex flex-col gap-1 p-1"
    >
      {#each $queryResult.data as anime}
        <a
          tabindex={0}
          href="/"
          class="variant-soft-surface btn justify-stretch gap-2 overflow-hidden p-2"
        >
          <img
            src={anime.cover}
            alt=""
            class="h-82 aspect-[2/1] object-cover lg:h-12"
            style="border-radius: var(--theme-rounded-base)"
          />
          <!-- <Icon icon="ph:magnifying-glass" /> -->
          <div class="text-left">
            <h7 class="h6 font-medium">{getMainTitle(anime.title)}</h7>

            <div class="flex items-center gap-2 text-xs">
              {#if anime.rating}
                <p class="flex items-center gap-1">
                  <Icon icon="ph:star-fill" class="text-secondary-500-400-token" />
                  <span>{anime.rating / 10}/10</span>
                </p>
              {/if}
              {#if anime.releaseDate}
                <p class="flex items-center gap-1">
                  <Icon icon="ph:clock-fill" />
                  <span>{anime.releaseDate}</span>
                </p>
              {/if}
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
