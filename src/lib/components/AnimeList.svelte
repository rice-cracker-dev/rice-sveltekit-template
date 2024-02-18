<script lang="ts">
  import { getMainTitle } from '$lib/consumet';
  import type { IAnimeResult } from '@consumet/extensions';
  import Icon from '@iconify/svelte';

  export let animes: IAnimeResult[] | null = null;
  export let isLoading = true;
</script>

<div class="flex flex-col items-stretch gap-8 overflow-hidden">
  {#if animes && !isLoading}
    {#each animes as anime}
      <a href="/" class="btn items-center justify-start gap-4 p-0">
        <img
          src={anime.cover}
          alt=""
          class="aspect-[2/1] h-16 object-cover lg:h-24"
          style="border-radius: var(--theme-rounded-base);"
        />

        <div class="space-y-2 text-left">
          <h4 class="h4 truncate font-medium">{getMainTitle(anime.title)}</h4>

          <div class="mt-1 flex items-center gap-4 text-xs lg:text-sm">
            {#if anime.rating}
              <p class="flex items-center gap-2">
                <Icon icon="ph:star-fill" class="text-secondary-500-400-token" />
                <span>{anime.rating / 10}/10</span>
              </p>
            {/if}
            {#if anime.releaseDate}
              <p class="flex items-center gap-2">
                <Icon icon="ph:clock-fill" />
                <span>{anime.releaseDate}</span>
              </p>
            {/if}
          </div>

          {#if anime.genres}
            <div class="mt-4 hidden flex-wrap gap-2 lg:flex">
              {#each anime.genres as genre}
                <span class="variant-soft-surface badge">{genre}</span>
              {/each}
            </div>
          {/if}
        </div>
      </a>
    {/each}
  {/if}

  {#if isLoading}
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(20) as _}
      <div class="flex items-center justify-start gap-4 p-0">
        <div
          class="placeholder aspect-[2/1] h-16 lg:h-24"
          style="border-radius: var(--theme-rounded-base);"
        />

        <div class="space-y-2 text-left">
          <div class="placeholder h-4 w-48" />

          <div class="placeholder h-3 w-48 lg:h-4" />

          <div class="hidden flex-wrap gap-2 pt-4 lg:flex">
            <span class="placeholder h-4 w-12" />
            <span class="placeholder h-4 w-12" />
            <span class="placeholder h-4 w-12" />
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
