<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import NestedAccordion from './nested-accordion.svelte';
	import type { DirectoryTree } from 'directory-tree';

	export let isCollapsed: boolean;
	export let routes: DirectoryTree[] | undefined;
	export let title: string;
</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		<h4 class="p-2 text-sm font-semibold">{title}</h4>
		<Accordion.Root class="w-full" multiple>
			<NestedAccordion {routes} />
		</Accordion.Root>
	</nav>
</div>
