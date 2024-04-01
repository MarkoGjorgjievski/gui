<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
	import { cn } from '$lib/utils.js';

	type $$Props = AccordionPrimitive.TriggerProps;
	type $$Events = AccordionPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export let level: AccordionPrimitive.HeaderProps['level'] = 3;
	export { className as class };
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		class={cn(
			'flex flex-1 items-center justify-between gap-2 py-1 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90',
			className
		)}
		{...$$restProps}
		on:click
	>
		<ChevronRight
			class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
		/>
		<span class="flex-1"><slot /></span>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
