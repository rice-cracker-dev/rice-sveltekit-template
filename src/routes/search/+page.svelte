<script lang="ts">
  import type { SortGroup } from '$lib/consumet/types';
  import { onMount } from 'svelte';
  import { type PopupSettings, popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { useQueryClient, useQuery } from '@sveltestack/svelte-query';
  import { page } from '$app/stores';
  import { anilistSearch, sortGroups } from '$lib/consumet';
  import { type View, viewIcons } from '$lib/components';
  import { isStrEmpty } from '$lib/validation';
  import Icon from '@iconify/svelte';
  import AnimeGroup from '$lib/components/AnimeGroup.svelte';

  type QueryData = {
    searchQuery: string;
    sortBy: SortGroup;
    currentPage: number;
  };

  let sortButtonElement: HTMLButtonElement;
  let sortPopupWidth = 0;
  let animeGroupView: View | string = 'grid';

  let query: QueryData = {
    searchQuery: '',
    sortBy: sortGroups.popularity,
    currentPage: 1,
  };

  const sortPopup: PopupSettings = {
    event: 'click',
    target: 'sortPopup',
    placement: 'bottom',
    closeQuery: '.listbox-item',
  };

  const queryClient = useQueryClient();
  const queryResult = useQuery(
    'search',
    async () => {
      return await anilistSearch({
        query: isStrEmpty(query.searchQuery) ? null : query.searchQuery,
        sort: query.sortBy.desc,
        perPage: 20,
        page: query.currentPage,
      });
    },
    { enabled: false }
  );

  onMount(() => {
    const observer = new ResizeObserver(() => {
      sortPopupWidth = sortButtonElement.clientWidth;
    });

    observer.observe(sortButtonElement);

    const searchQuery = $page.url.searchParams.get('q') ?? '';
    const sort = $page.url.searchParams.get('sort');

    const sortBy = sort && sortGroups[sort] ? sortGroups[sort] : sortGroups.popularity;

    query = { searchQuery, sortBy, currentPage: 1 };

    queryResult.setEnabled(true);

    return () => observer.disconnect();
  });
</script>

<div class="container mx-auto mt-32 space-y-8 px-4">
  <form
    class="flex flex-col items-stretch gap-4 md:flex-row md:items-center"
    on:submit|preventDefault={() => {
      query.currentPage = 1;
      queryClient.invalidateQueries('search');
    }}
  >
    <input placeholder="Search anime" class="input flex-1" bind:value={query.searchQuery} />

    <button
      bind:this={sortButtonElement}
      type="button"
      class="variant-filled-surface btn justify-start gap-2 md:w-48"
      use:popup={sortPopup}
    >
      {query.sortBy.label}
      <Icon icon="ph:caret-down" class="ml-auto" />
    </button>

    <div class="card container z-10" style="width: {sortPopupWidth}px;" data-popup="sortPopup">
      <ListBox active="variant-filled-primary" rounded="rounded-none">
        {#each Object.values(sortGroups) as sortGroup}
          <ListBoxItem
            bind:group={query.sortBy}
            name="sortBy"
            value={sortGroup}
            on:change={() => {
              query.currentPage = 1;
              queryClient.invalidateQueries('search');
            }}
          >
            {sortGroup.label}
          </ListBoxItem>
        {/each}
      </ListBox>
    </div>
  </form>

  <div class="flex items-center gap-4">
    <h3 class="h3 font-semibold">Results</h3>

    <div class="ml-auto flex items-center gap-2">
      {#each Object.entries(viewIcons) as [view, icon]}
        <button
          class="btn-icon {view === animeGroupView
            ? 'variant-filled-primary'
            : 'hover:variant-soft-surface'}"
          on:click={() => (animeGroupView = view)}
        >
          <Icon {icon} />
        </button>
      {/each}

      <button
        disabled={$queryResult.isRefetching ||
          !$queryResult.data?.totalPages ||
          query.currentPage <= 1}
        class="btn-icon hover:variant-soft-surface"
        on:click={() => {
          query.currentPage -= 1;
          queryClient.invalidateQueries('search');
        }}
      >
        <Icon icon="ph:caret-left" />
      </button>
      <p>
        {query.currentPage} / {$queryResult.data?.totalPages ?? 'Loading'}
      </p>
      <button
        disabled={$queryResult.isRefetching ||
          !$queryResult.data?.totalPages ||
          query.currentPage >= $queryResult.data.totalPages}
        class="btn-icon hover:variant-soft-surface"
        on:click={() => {
          query.currentPage += 1;
          queryClient.invalidateQueries('search');
        }}
      >
        <Icon icon="ph:caret-right" />
      </button>
    </div>
  </div>

  <AnimeGroup
    animes={$queryResult.data?.results}
    isLoading={$queryResult.isRefetching || $queryResult.isLoading || $queryResult.isFetching}
    view={animeGroupView}
  />
</div>
