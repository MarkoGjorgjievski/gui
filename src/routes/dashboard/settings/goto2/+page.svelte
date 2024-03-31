<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Goto2Form from './goto2-form.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Goto 2</h3>
		<p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
	</div>
	<Separator />
	<Goto2Form data={data.form} />
</div>
