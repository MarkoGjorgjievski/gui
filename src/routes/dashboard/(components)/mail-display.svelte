<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as Icons from '../icons.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';

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
				>
					<Icons.Rocket class="size-4" />
					<span class="sr-only">Deploy</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Deploy</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
	<Separator />
	<div class="h-full p-4">
		<Card.Root>
			<div class="flex justify-between pb-2">
				<Card.Header class="pb-2">
					<Card.Description>Total</Card.Description>
					<Card.Title class="text-lg">1000</Card.Title>
				</Card.Header>
				<Card.Header class="pb-2">
					<Card.Description>Successful</Card.Description>
					<Card.Title class="text-lg">998</Card.Title>
				</Card.Header>
				<Card.Header class="pb-2">
					<Card.Description>Failed</Card.Description>
					<Card.Title class="text-lg text-red-300">2</Card.Title>
				</Card.Header>
			</div>
			<Card.Content>
				<div class="flex items-center justify-between gap-1 text-xs text-muted-foreground">
					12/12 completed stages
					<Button size="sm" variant="link"
						>See extractor <Icons.ExternalLink class="ml-1 size-4" /></Button
					>
				</div>
			</Card.Content>
			<Card.Footer>
				<Progress value={98} aria-label="12% increase" class="h-1" />
			</Card.Footer>
		</Card.Root>
	</div>
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
