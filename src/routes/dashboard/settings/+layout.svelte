<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import SidebarNav from './(components)/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Index',
			href: '/dashboard/settings'
		},
		{
			title: 'Goto 2',
			href: '/dashboard/settings/goto2'
		}
	];
</script>

<div class="pb-xl max-w-4xl space-y-6 p-10">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
	</div>
	<Separator class="my-6" />

	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="w-full flex-1 lg:max-w-2xl">
			<ScrollArea class="h-[80vh]">
				<div class="pb-4 pl-0.5 pr-3"><slot /></div>
			</ScrollArea>
		</div>
	</div>
</div>
