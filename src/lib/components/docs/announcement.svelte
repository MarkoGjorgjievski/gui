<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import { Icons } from './icons/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	href="/docs/changelog"
	class={cn(
		'inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium',
		className
	)}
	{...$$restProps}
>
	🎉 <Separator class="mx-2 h-4" orientation="vertical" />{' '}
	<span class="sm:hidden">Introducing Blocks</span>
	<span class="hidden sm:inline"> Introducing Blocks </span>
	<Icons.arrowRight class="ml-1 h-4 w-4" />
</a>
