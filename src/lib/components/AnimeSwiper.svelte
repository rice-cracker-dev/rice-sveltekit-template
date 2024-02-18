<script lang="ts">
  import { onMount } from 'svelte';
  import { type IAnimeResult, MediaStatus } from '@consumet/extensions';
  import { Pagination } from 'swiper/modules';
  import { getMainTitle } from '$lib/consumet';
  import Swiper from 'swiper';
  import Icon from '@iconify/svelte';
  import SafeHtml from './SafeHTML.svelte';

  export let animes: IAnimeResult[];

  let swiperContainer: HTMLDivElement;

  onMount(() => {
    new Swiper(swiperContainer, {
      modules: [Pagination],
      pagination: { el: '.swiper-pagination' },
    });
  });
</script>

<div bind:this={swiperContainer} class="swiper">
  <div class="swiper-wrapper">
    {#each animes as anime}
      <a href="/" class="swiper-slide h-[24rem] md:h-[32rem] lg:h-svh">
        <div class="absolute z-10 h-[12rem] w-full bg-gradient-to-b from-black/75 to-transparent" />

        <div class="flex h-full items-center justify-center">
          {#if anime.cover}
            <img
              src={anime.cover}
              alt="alt thumbnail"
              class="absolute h-full object-cover object-bottom brightness-50"
              style="-webkit-mask-image: linear-gradient(to bottom, #000, transparent);"
            />
          {/if}

          <div class="container p-4">
            <div class="relative md:max-w-[50%] xl:max-w-[40%]">
              <h1 class="h2 font-semibold lg:h1">{getMainTitle(anime.title)}</h1>
              {#if anime.genres}
                <div class="mt-4 hidden gap-2 lg:flex">
                  {#each anime.genres as genre}
                    <span class="variant-soft-surface badge">{genre}</span>
                  {/each}
                </div>
              {/if}
              <div class="mt-2 flex items-center gap-4 lg:my-8 lg:gap-8">
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
                {#if anime.status}
                  <span
                    class="badge"
                    class:variant-filled-success={anime.status === MediaStatus.COMPLETED}
                    class:variant-filled-error={anime.status === MediaStatus.CANCELLED ||
                      anime.status === MediaStatus.UNKNOWN}
                    class:variant-filled-warning={anime.status === MediaStatus.ONGOING ||
                      anime.status === MediaStatus.HIATUS ||
                      anime.status === MediaStatus.NOT_YET_AIRED}
                  >
                    {anime.status}
                  </span>
                {/if}
              </div>

              {#if anime.description}
                <p class="hidden lg:line-clamp-4">
                  <SafeHtml html={anime.description} />
                </p>
              {/if}

              <div class="mt-8 hidden items-center gap-4 lg:flex">
                <button class="variant-filled-primary btn gap-4">
                  <Icon icon="ph:television-simple-fill" />
                  Watch now
                </button>

                <button class="variant-filled btn-icon">
                  <Icon icon="ph:share" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="swiper-pagination" />
</div>
