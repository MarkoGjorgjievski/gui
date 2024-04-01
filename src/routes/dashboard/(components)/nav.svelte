<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Route } from '../config.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	export let isCollapsed: boolean;
	export let routes: Route[];
</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		<Accordion.Root class="w-full">
			{#each routes as route, i}
				<Accordion.Item value="item-{i}" class="px-2">
					<Accordion.Trigger class="py-2.5">
						<span class="flex items-center gap-1">
							<svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" />
							{route.title}
						</span>
					</Accordion.Trigger>
					<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</nav>
</div>
