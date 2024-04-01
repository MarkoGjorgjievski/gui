<script>
	import '../app.css';
	import Mail from './dashboard/(components)/mail.svelte';
	export let data;

	console.log(data);
</script>

<h1>Hello world</h1>

<Mail
	routes={data.tree.children}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={15}
>
	<slot />
</Mail>
