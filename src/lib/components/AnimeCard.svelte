<script lang="ts">
  import type { IAnimeResult } from '@consumet/extensions';
  import { getMainTitle } from '$lib/consumet';
  import Icon from '@iconify/svelte';

  export let anime: IAnimeResult;
</script>

<a
  href="/"
  class="swiper-slide group variant-filled-surface btn relative aspect-[5/8] overflow-hidden p-0"
  style="border-radius: var(--theme-rounded-base);"
>
  <img src={anime.image} alt="" class="absolute inset-0 h-full object-cover" />
  <div class="!mx-0 mt-auto w-full p-2 text-left backdrop-blur-lg backdrop-brightness-50">
    <h6 class="text-surface-900-50-token h6 line-clamp-1 font-semibold">
      {getMainTitle(anime.title)}
    </h6>

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
  </div>
</a>
