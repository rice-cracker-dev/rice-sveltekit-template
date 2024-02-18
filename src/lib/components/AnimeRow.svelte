<script lang="ts">
  import AnimeCard from './AnimeCard.svelte';

  import type { IAnimeResult } from '@consumet/extensions';
  import { onMount } from 'svelte';
  import Swiper from 'swiper';

  export let animes: IAnimeResult[];

  let swiperContainer: HTMLDivElement;

  onMount(() => {
    new Swiper(swiperContainer, {
      spaceBetween: 16,
      slidesPerView: 2,
      breakpoints: {
        640: { slidesPerView: 3 },
        960: { slidesPerView: 4 },
        1280: { slidesPerView: 6 },
      },
    });
  });
</script>

<div class="space-y-8 p-4">
  <div class="flex items-center gap-4">
    <slot name="headerLeft" />
    <div class="ml-auto">
      <slot name="headerRight" />
    </div>
  </div>
  <div bind:this={swiperContainer} class="swiper">
    <div class="swiper-wrapper">
      {#each animes as anime}
        <AnimeCard {anime} />
      {/each}
    </div>
  </div>
</div>
