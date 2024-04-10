<script lang="ts">
	import { DateFormatter, getDayOfWeek, getLocalTimeZone, now } from '@internationalized/date';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Mail } from '../data.js';
	import * as Icons from '../icons.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	export let mail: Mail | null = null;

	const branches = [
		{ value: 'master', label: 'master' },
		{ value: 'stubhub', label: 'stubhub' },
		{ value: 'ddf-100', label: 'DDF-100' }
	];
</script>

<div class="flex h-full flex-col">
	<div class="mb-1 flex items-center px-4 py-2">
		<h2 class="mr-auto text-sm font-semibold">Deployment</h2>
		<div class="flex items-center gap-2">
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="run_local_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.CirclePlay class="size-4" />
					<span class="sr-only">Run Local</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Run Local</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="run_remote_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.Play class="size-4" />
					<span class="sr-only">Run Remote</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Run Remote</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="deploy_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.Rocket class="size-4" />
					<span class="sr-only">Deploy</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Deploy</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
	<Separator />
	<div class="h-full">data.json</div>
	<Separator />
	<div class="mb-1 flex items-center px-4 py-2">
		<Icons.Github class="size-4" />
		<div class="ml-2 mr-auto">
			<Select.Root portal={null}>
				<Select.Trigger class="w-[120px]">
					<Select.Value placeholder={branches[branches.length - 1].label} />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each branches as branch}
							<Select.Item value={branch.value} label={branch.label}>{branch.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="favoriteFruit" />
			</Select.Root>
		</div>
		<div class="flex items-center gap-2">
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="pull_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.ArrowDownFromLine class="size-4" />
					<span class="sr-only">Pull</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Pull</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="update_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.GitMerge class="size-4" />
					<span class="sr-only">Merge</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Merge</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="push_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!mail}
				>
					<Icons.ArrowUpFromLine class="size-4" />
					<span class="sr-only">Push</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Push</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
	<Separator />
	<div class="flex flex-col gap-2 p-4">
		<Input placeholder="Commit message" class="w-full" />
		<Button variant="outline"><Icons.GitCommitVertical class="size-4" /> Commit</Button>
	</div>
</div>
