<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = TabsPrimitive.ListProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<TabsPrimitive.List
	class={cn(
		'inline-flex  w-full items-center  text-muted-foreground outline outline-1 outline-muted',
		className
	)}
	{...$$restProps}
>
	<slot />
</TabsPrimitive.List>
