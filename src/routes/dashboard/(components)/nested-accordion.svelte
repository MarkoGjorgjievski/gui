<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as NestedAccordion from '$lib/components/ui/nested-accordion/index.js';
	import { cn } from '$lib/utils';
	import type { DirectoryTree } from 'directory-tree';
	import * as Icon from '../(components)/icons';
	import { Button } from '$lib/components/ui/button';

	export let routes: DirectoryTree[] | undefined = undefined;

	const iconMapper = new Map([
		['js', Icon.JS],
		['yaml', Icon.YAML]
	]);

	const onClick = (route: DirectoryTree, routes: DirectoryTree[] | undefined) => {
		console.log(route);
		const p = route.path.split('\\');
		const slice = p.slice(2, p.length - 1).join('/');
		const url = new URL(`${$page.url.origin}/${slice}`);

		url.searchParams.set('folder', routes?.map((route) => `<${route.name}>`).join('') || '');
		url.searchParams.set('file', route.name);

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
				<NestedAccordion.Content class="is-open group ml-2 border-l border-l-muted/50 pl-1">
					<svelte:self routes={route.children} />
				</NestedAccordion.Content>
			</NestedAccordion.Item>
		{:else}
			<Button on:click={() => onClick(route, routes)} variant="link">
				<svelte:component
					this={route.name ? iconMapper.get(route.name.split('.')[1]) : Icon.JS}
					class="mr-1 mt-px size-4"
				/>
				{route.name}
			</Button>
			<!-- <a href={path}>{route.name}</a> -->
		{/if}
	{/each}
{/if}
