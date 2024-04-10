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
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { goto } from '$app/navigation';
	import SinglePageForm from './forms/single-page-form.svelte';
	import IndexForm from '../settings/index-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Icons from '../icons.js';
	import * as Icon from '../(components)/icons';
	import JSPlayground from '../(components)/js-playground.svelte';

	export let accounts: Account[];
	export let mails: Mail[];
	export let routes: DirectoryTree[] | undefined;
	export let defaultLayout = [265, 440, 655];
	// export let defaultLayout = [265, 655, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;
	export let forms;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	const onClick = (file: string) => {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('file', file);
		goto(newUrl);
	};

	const iconMapper = new Map([
		['js', Icon.JS],
		['yaml', Icon.YAML]
	]);

	const [library, orgs] = routes || [];
</script>

<Resizable.PaneGroup
	direction="horizontal"
	{onLayoutChange}
	class="max-h-screen min-h-screen items-stretch"
>
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
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30} maxSize={65}>
		<div class="mb-1 flex items-center justify-between px-4 py-2">
			<Breadcrumbs />
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="save_tooltip"
					class={buttonVariants({ variant: 'outline', size: 'icon' })}
				>
					<Icons.Save class="size-4" />
					<span class="sr-only">Save</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Save</Tooltip.Content>
			</Tooltip.Root>
		</div>
		{#if $page.url.searchParams.toString().length}
			<TabNav.Root value={$page.url.searchParams.get('file') || 'index.js'} class="mt-1">
				<TabNav.List class="mt-px w-full">
					<TabNav.List class="ml-auto">
						{#each $page.url.searchParams
							.getAll('folder')[0]
							.replace('%2B', '+')
							.split(/<|>/)
							.filter(Boolean) as file}
							<TabNav.Trigger value={file} on:click={() => onClick(file)}>
								<svelte:component
									this={file ? iconMapper.get(file.split('.')[1]) : Icon.JS}
									class="mr-1 mt-px size-4"
								/>{file}</TabNav.Trigger
							>
						{/each}
					</TabNav.List>
				</TabNav.List>
				<TabNav.Content value="index.js"><IndexForm data={forms.indexForm} /></TabNav.Content>
				<TabNav.Content value="transform.js"><JSPlayground /></TabNav.Content>
				<TabNav.Content value="singlePage.yaml"
					><SinglePageForm data={forms.singlePageForm} /></TabNav.Content
				>
			</TabNav.Root>
		{/if}
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={defaultLayout[2]} maxSize={30}>
		<MailDisplay mail={mails[0]} />
	</Resizable.Pane>
</Resizable.PaneGroup>
