<script lang="ts">
  import { page } from '$app/stores';
  import { isSameUrl } from '$lib/validation';
  import { links } from '../navbar';
  import Icon from '@iconify/svelte';
  import { currentDrawerComponent } from '$lib/stores/drawer';
</script>

<div class="flex items-center p-5">
  <a href="/" class="text-primary-500-400-token h3 font-semibold">
    Pand<span class="text-surface-600-300-token">anime</span>
  </a>

  <button
    class="btn-icon ml-auto hover:variant-soft-surface"
    on:click={() => currentDrawerComponent.open(null)}
  >
    <Icon icon="ph:x" />
  </button>
</div>

<div>
  {#each links as link}
    <a
      href={link.href}
      class="btn-with-icon btn w-full items-center rounded-none {isSameUrl(
        $page.url.pathname,
        link.href
      )
        ? 'variant-filled-primary'
        : 'hover:variant-soft-surface'}"
    >
      <div>
        {#if link.icon}
          <Icon icon={link.icon} />
        {/if}
      </div>
      <p>{link.label}</p>
    </a>
  {/each}
</div>
