<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as TabNav from '$lib/components/ui/tab-nav/index.js';
	import IndexForm from '../settings/index-form.svelte';
	import SinglePageForm from './forms/single-page-form.svelte';
	import JSPlayground from './js-playground.svelte';

	export let forms;
</script>

<TabNav.Content value="index.js">
	<ScrollArea orientation="vertical" class="h-[calc(100vh_-_88px)]">
		<div class="p-8">
			<IndexForm data={forms.indexForm} />
		</div>
	</ScrollArea>
</TabNav.Content>
<TabNav.Content value="transform.js"><JSPlayground /></TabNav.Content>
<TabNav.Content value="singlePage.yaml"
	><SinglePageForm data={forms.singlePageForm} /></TabNav.Content
>
