<script>
	import '../app.css';
	import { accounts, mails } from './dashboard/data';
	import Mail from './dashboard/(components)/mail.svelte';
	export let data;

	console.log(data);
</script>

<svelte:head><title>Import GUI</title></svelte:head>

<Mail
	forms={data.forms}
	{mails}
	{accounts}
	routes={data.routes.children}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={15}
>
	<slot />
</Mail>
