<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as NestedAccordion from '$lib/components/ui/nested-accordion/index.js';
	import { cn } from '$lib/utils';
	import type { DirectoryTree } from 'directory-tree';
	// import { type Route } from '../config';

	export let routes: DirectoryTree[] | undefined = undefined;

	const onClick = (path: string) => {
		console.log(path);
		const p = path.split('\\');
		const url = new URL(`http://localhost:5173/${p.slice(2, p.length - 1).join('/')}`);
		url.searchParams.set('file', p[p.length - 1]);
		goto(url);
	};
</script>

{#if routes}
	{#each routes as route}
		<!-- {@const p = route.path.split('\\')}
		{@const path = `/${p.slice(2, p.length - 1).join('/')}`} -->
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
			<button on:click={() => onClick(route.path)} class="flex">
				{route.name}
			</button>
			<!-- <a href={path}>{route.name}</a> -->
		{/if}
	{/each}
{/if}
