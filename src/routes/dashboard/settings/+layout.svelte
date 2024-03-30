<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import SidebarNav from './(components)/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/dashboard/settings'
		},
		{
			title: 'Account',
			href: '/dashboard/settings/account'
		},
		{
			title: 'Appearance',
			href: '/dashboard/settings/appearance'
		},
		{
			title: 'Notifications',
			href: '/dashboard/settings/notifications'
		},
		{
			title: 'Display',
			href: '/dashboard/settings/display'
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
			<ScrollArea class="h-screen w-fit">
				<slot />
			</ScrollArea>
		</div>
	</div>
</div>
