<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Route } from '../config.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import NestedAccordion from './nested-accordion.svelte';

	export let isCollapsed: boolean;
	export let routes: Route[];
</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		<Accordion.Root class="w-full" multiple>
			<NestedAccordion {routes} />
		</Accordion.Root>
	</nav>
</div>
