<script lang="ts" context="module">
	export const notificationsFormSchema = goto2Params;
	type NotificationFormSchema = typeof notificationsFormSchema;

	const blockUnnecessaryRequests = [
		{
			id: 'xhr',
			label: 'xhr'
		},
		{
			id: 'script',
			label: 'script'
		},
		{
			id: 'font',
			label: 'font'
		},
		{
			id: 'stylesheet',
			label: 'stylesheet'
		}
	] as const;
</script>

<script lang="ts">
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';

	import { browser } from '$app/environment';
	import { goto2Params, countries } from '$lib/schema';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<NotificationFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(notificationsFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance, validate } = form;
</script>

<form method="POST" use:enhance class="space-y-8">
	<Form.Fieldset {form} name="blockUnnecessaryRequests" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">blockUnnecessaryRequests</Form.Legend>
			<Form.Description>Select the requests you want to block.</Form.Description>
		</div>
		<div class="space-y-2">
			{#each blockUnnecessaryRequests as req}
				{@const checked = $formData.blockUnnecessaryRequests.includes(req.id)}
				<div class="flex flex-row items-center space-x-3">
					<Form.Control let:attrs>
						{@const { name, ...rest } = attrs}
						<Checkbox.Root
							{...rest}
							{checked}
							onCheckedChange={(v) => {
								if (v) {
									$formData.blockUnnecessaryRequests = [
										...$formData.blockUnnecessaryRequests,
										req.id
									];
								} else {
									$formData.blockUnnecessaryRequests = $formData.blockUnnecessaryRequests.filter(
										(i) => i !== req.id
									);
								}
							}}
						/>
						<Form.Label class="font-normal">
							{req.label}
						</Form.Label>
						<input type="checkbox" {name} hidden value={req.id} {checked} />
					</Form.Control>
				</div>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>

	<div class="space-y-4">
		<Form.Field
			{form}
			name="setBlockAds"
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label class="text-base">setBlockAds</Form.Label>
					<Form.Description>Receive emails about your account activity.</Form.Description>
				</div>
				<Switch includeInput {...attrs} bind:checked={$formData.setBlockAds} />
			</Form.Control>
		</Form.Field>
		<Form.Field
			{form}
			name="setBypassCSP"
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label class="text-base">setBypassCSP</Form.Label>
					<Form.Description>
						Receive emails about new products, features, and more.
					</Form.Description>
				</div>
				<Switch includeInput {...attrs} bind:checked={$formData.setBypassCSP} />
			</Form.Control>
		</Form.Field>
		<Form.Field
			{form}
			name="setLoadAllResources"
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label class="text-base">setLoadAllResources</Form.Label>
					<Form.Description>
						Receive emails for friend requests, follows, and more.
					</Form.Description>
				</div>
				<Switch includeInput {...attrs} bind:checked={$formData.setLoadAllResources} />
			</Form.Control>
		</Form.Field>
		<Form.Field
			{form}
			name="setLoadImages"
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label class="text-base">setLoadImages</Form.Label>
					<Form.Description>
						Receive emails about your account activity and security.
					</Form.Description>
				</div>
				<Switch includeInput {...attrs} bind:checked={$formData.setLoadImages} />
			</Form.Control>
		</Form.Field>
		<Form.Field
			{form}
			name="setCssEnabled"
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label class="text-base">setCssEnabled</Form.Label>
					<Form.Description>
						Receive emails about your account activity and security.
					</Form.Description>
				</div>
				<Switch includeInput {...attrs} bind:checked={$formData.setCssEnabled} />
			</Form.Control>
		</Form.Field>
	</div>
	<Separator />

	<Form.Fieldset {form} name="waitUntil">
		<Form.Control>
			<Form.Label>Wait until</Form.Label>
			<RadioGroup.Root bind:value={$formData.waitUntil}>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="networkidle0" {...attrs} />
						<Form.Label>networkidle0</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="networkidle1" {...attrs} />
						<Form.Label>networkidle1</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="networkidle2" {...attrs} />
						<Form.Label>networkidle2</Form.Label>
					</Form.Control>
				</div>
				<RadioGroup.Input name="waitUntil" />
			</RadioGroup.Root>
		</Form.Control>
	</Form.Fieldset>

	<Form.Field {form} name="country" class="flex flex-col">
		<Popover.Root>
			<Form.Control let:attrs>
				<Form.Label>Country</Form.Label>
				<Popover.Trigger
					role="combobox"
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-[200px] justify-between',
						!$formData.country && 'text-muted-foreground'
					)}
					{...attrs}
				>
					{countries.find((country) => country.value === $formData.country)?.label ||
						'Select a language'}
					<CaretSort class="ml-2 size-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$formData.country} name={attrs.name} />
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search country..." />
					<Command.Empty>No country found.</Command.Empty>
					<Command.List>
						{#each countries as country}
							<Command.Item
								{...form}
								value={country.label}
								onSelect={() => {
									$formData.country = country.value;
									validate('country');
								}}
							>
								<Check
									class={cn(
										'mr-2 size-4',
										country.value === $formData.country ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{country.label}
							</Command.Item>
						{/each}
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</Form.Field>

	<Form.Field {form} name="domain">
		<Form.Control let:attrs>
			<Form.Label>Domain</Form.Label>
			<Input placeholder={`amazon`} {...attrs} bind:value={$formData.domain} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="schemaYAML">
		<Form.Control let:attrs>
			<Form.Label>schemaYAML</Form.Label>
			<Input {...attrs} bind:value={$formData.schemaYAML} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
