<script lang="ts">
  import { currentDrawerComponent } from '$lib/stores/drawer';
  import { links } from './navbar';
  import Icon from '@iconify/svelte';

  let scrollY: number;
</script>

<svelte:window bind:scrollY />

<nav
  class="fixed inset-x-0 top-0 z-[9998] bg-gradient-to-b duration-150 {scrollY > 10 &&
    'bg-black/50 backdrop-blur-lg'}"
>
  <div class="container relative mx-auto grid grid-cols-2 items-center gap-4 p-4">
    <div class="flex items-center gap-4">
      <a href="/" class="text-primary-500-400-token h3 font-semibold">
        Pand<span class="text-surface-900-50-token">anime</span>
      </a>
    </div>

    <div class="flex items-center justify-end gap-2">
      {#each links as link}
        <a
          href={link.href}
          class="btn hidden items-center gap-4 hover:variant-soft-surface md:flex"
        >
          {#if link.icon}
            <Icon icon={link.icon} />
          {/if}
          {link.label}
        </a>
      {/each}

      <button
        class="btn-icon hover:variant-soft-surface"
        on:click={() => currentDrawerComponent.open('navbarSearch')}
      >
        <Icon icon="ph:magnifying-glass" />
      </button>

      <button
        class="btn-icon hover:variant-filled-surface md:hidden"
        on:click={() => currentDrawerComponent.open('navbar')}
      >
        <Icon icon="ph:list" />
      </button>
    </div>
  </div>
</nav>
