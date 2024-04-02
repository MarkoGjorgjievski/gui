<script>
	import '../app.css';
	import { accounts } from './dashboard/data';
	import Mail from './dashboard/(components)/mail.svelte';
	export let data;

	console.log(data);
</script>

<Mail
	{accounts}
	routes={data.tree.children}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={15}
>
	<slot />
</Mail>
