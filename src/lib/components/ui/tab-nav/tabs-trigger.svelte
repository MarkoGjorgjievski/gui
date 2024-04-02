<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = TabsPrimitive.TriggerProps;
	type $$Events = TabsPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'];
	export { className as class };
</script>

<TabsPrimitive.Trigger
	class={cn(
		'after:data-[state=active]:botom-0 relative inline-flex items-center justify-center whitespace-nowrap border-r px-5 py-1.5 text-sm ring-offset-background transition-all focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow after:data-[state=active]:absolute after:data-[state=active]:bottom-0 after:data-[state=active]:h-0.5 after:data-[state=active]:w-full after:data-[state=active]:bg-sky-700',
		className
	)}
	{value}
	{...$$restProps}
	on:click
	on:keydown
	on:focus
>
	<slot />
</TabsPrimitive.Trigger>
