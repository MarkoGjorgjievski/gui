<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { page } from '$app/stores';
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each $page.url.pathname.split('/').filter(Boolean) as path, i}
			{#if i}
				<Breadcrumb.Separator />
			{/if}
			<Breadcrumb.Item>
				<Breadcrumb.Page>{path}</Breadcrumb.Page>
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
