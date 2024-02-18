<script lang="ts">
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { Drawer, getDrawerStore, initializeStores, storePopup } from '@skeletonlabs/skeleton';
  import { currentDrawerComponent } from '$lib/stores/drawer';
  import Navbar from '$lib/components/Navbar.svelte';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import '@fontsource-variable/inter';
  import '@fontsource-variable/outfit';
  import '../app.scss';

  // init stores
  initializeStores();

  // Floating UI for Popups
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  // drawer
  const drawerStore = getDrawerStore();

  // svelte-query
  const queryClient = new QueryClient();

  $: if ($currentDrawerComponent) {
    drawerStore.open($currentDrawerComponent.options);
  } else {
    drawerStore.close();
  }
</script>

<QueryClientProvider client={queryClient}>
  <Drawer zIndex="z-[9999]">
    {#if $currentDrawerComponent}
      <svelte:component this={$currentDrawerComponent.component} />
    {/if}
  </Drawer>

  <Navbar />

  <main class="min-h-svh">
    <slot />
  </main>
</QueryClientProvider>
