<script lang="ts">
	import FontBold from 'svelte-radix/FontBold.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
</script>

<ToggleGroup.Root size="sm" type="single" class="sticky top-0 flex-col px-2">
	{#each alphabet.split('') as letter}
		<ToggleGroup.Item value={letter} aria-label="Toggle bold">
			{letter}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
