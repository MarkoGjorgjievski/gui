<script lang="ts">
	import type { PageData } from './$types.js';
	import SinglePageForm from '../../(components)/forms/single-page-form.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Index</h3>
		<p class="text-sm text-muted-foreground">
			This is a shared configuration file for this extractor.
		</p>
	</div>
	<Separator />
	<SinglePageForm data={data.form} />
</div>
