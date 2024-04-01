<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { type Route } from '../config';

	export let routes: Route[] | undefined = undefined;
</script>

{#if routes}
	{#each routes as route}
		{#if route.routes}
			<Accordion.Item value="item-{route.title}">
				<Accordion.Trigger class="pt-px">
					<span class="flex items-center gap-1">
						<!-- <svelte:component this={icon} class="mr-2 size-4" aria-hidden="true" /> -->
						{route.title}
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="pl-4">
					<svelte:self routes={route.routes} />
				</Accordion.Content>
			</Accordion.Item>
		{:else}
			<div class="py-1 pl-2.5 text-sm">
				{route.title}
			</div>
		{/if}
	{/each}
{/if}
