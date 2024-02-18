<script lang="ts">
  import sanitize from 'sanitize-html';

  export let html: string;

  $: sanitizedHtml = sanitize(html);
</script>

<!-- eslint-disable-next-line -->
{@html sanitizedHtml}
