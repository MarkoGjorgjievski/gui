<script lang="ts">
	import AccountSwitcher from './account-switcher.svelte';
	// import { primaryRoutes, secondaryRoutes } from '../config.js';
	import MailDisplay from './mail-display.svelte';
	import MailList from './mail-list.svelte';
	import Nav from './nav.svelte';
	import { mailStore } from '../store.js';
	import { cn } from '$lib/utils.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { Separator } from '$lib/components/ui/select/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as TabNav from '$lib/components/ui/tab-nav/index.js';
	import Breadcrumbs from './breadcrumbs.svelte';
	import Search from 'lucide-svelte/icons/search';
	import type { Account, Mail } from '../data.js';
	import QuickSearch from './quick-search.svelte';
	import type { DirectoryTree } from 'directory-tree';
	import { page } from '$app/stores';
	// import type { Route } from '../config';

	export let accounts: Account[];
	export let mails: Mail[];
	export let routes: DirectoryTree[] | undefined;
	export let defaultLayout = [265, 440, 655];
	// export let defaultLayout = [265, 655, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	// function onCollapse() {
	//  isCollapsed = true;
	//  document.cookie = `PaneForge:collapsed=${true}`;
	// }

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	// $: console.log(routes, "routes")

	// $: console.log($page.url.pathname);
	// $: console.log($page.url.searchParams.get('file'));
	// const activeFolder = (): string => $page.url.searchParams.get('file') ? routes?.find(route => route.path === $page.url.pathname) ? activeFolder() : routes.map(route => route.children?.find(child => child.path === $page.url.pathname))

	// $: console.log("activeFolder", activeFolder())

	const [library, orgs] = routes || [];
</script>

<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="min-h-[100vh] items-stretch">
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		collapsedSize={navCollapsedSize}
		collapsible
		minSize={15}
		maxSize={20}
		onCollapse={() => null}
		{onExpand}
	>
		<div class={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
			<AccountSwitcher {isCollapsed} {accounts} />
		</div>
		<Separator />
		<Nav {isCollapsed} routes={library.children} title={library.name} />
		<Separator />
		<Nav {isCollapsed} routes={orgs.children} title={orgs.name} />
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30} maxSize={55}>
		<div class="flex items-center p-4">
			<Breadcrumbs />
		</div>
		{#if $page.url.searchParams.get('file')}
			<TabNav.Root value={$page.url.searchParams.get('file') || ''}>
				<div class="py-[5px]">
					<TabNav.List class="ml-auto">
						{#each $page.url.searchParams
							.getAll('folder')[0]
							.replace('%2B', '+')
							.split(/<|>/)
							.filter(Boolean) as searchParam}
							<TabNav.Trigger value={searchParam} class="text-zinc-600 dark:text-zinc-200"
								>{searchParam}</TabNav.Trigger
							>
						{/each}
					</TabNav.List>
				</div>
				{#each $page.url.searchParams.getAll('folder') as searchParam}
					<TabNav.Content value={searchParam} class="m-0">{searchParam}</TabNav.Content>
				{/each}
			</TabNav.Root>
		{/if}
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={defaultLayout[2]} maxSize={30}>
		<MailDisplay mail={mails[0]} />
	</Resizable.Pane>
</Resizable.PaneGroup>
