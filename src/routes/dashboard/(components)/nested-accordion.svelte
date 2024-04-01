<script lang="ts">
	import * as NestedAccordion from '$lib/components/ui/nested-accordion/index.js';
	import { cn } from '$lib/utils';
	import type { DirectoryTree } from 'directory-tree';
	// import { type Route } from '../config';

	export let routes: DirectoryTree[] | undefined = undefined;
</script>

{#if routes}
	{#each routes as route}
		{#if route.children}
			<NestedAccordion.Item value="item-{route.name}">
				<NestedAccordion.Trigger>
					<span class="flex items-center gap-1">
						<!-- <svelte:component this={icon} class="mr-2 size-4" aria-hidden="true" /> -->
						{route.name}
					</span>
				</NestedAccordion.Trigger>
				<NestedAccordion.Content class="is-open group pl-5">
					<svelte:self routes={route.children} />
				</NestedAccordion.Content>
			</NestedAccordion.Item>
		{:else}
			<p class="py-1 pl-2 text-sm group-[.is-open]:pl-5">
				{route.name}
			</p>
		{/if}
	{/each}
{/if}
