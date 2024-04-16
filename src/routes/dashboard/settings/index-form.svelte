<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Slider } from '$lib/components/ui/slider';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { type IndexSchema, indexSchema } from '$lib/schema';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as Icons from '../icons.js';

	export let data: SuperValidated<Infer<IndexSchema>>;

	const form = superForm(data, {
		validators: zodClient(indexSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	$: slider = [+$formData.loadingTimeout];

	function addOrderedSelector() {
		$formData.orderedSelectorsToClickOn = [...$formData.orderedSelectorsToClickOn, ''];

		tick().then(() => {
			const orderedSelectors = Array.from(
				document.querySelectorAll<HTMLElement>(
					"#index-form input[name='orderedSelectorsToClickOn']"
				)
			);
			const lastSelector = orderedSelectors[orderedSelectors.length - 1];
			lastSelector && lastSelector.focus();
		});
	}
</script>

<form method="POST" class="grid grid-cols-2 gap-8" use:enhance id="index-form">
	<Form.Field {form} name="loadedSelector">
		<Form.Control let:attrs>
			<Form.Label>
				Loaded selector
				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="loadedSelector_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>Selector for an element that is present when the page is correctly loaded.</Tooltip.Content
					>
				</Tooltip.Root>
				<Badge variant="outline">CSS</Badge>
			</Form.Label>
			<Input placeholder={`main#page`} {...attrs} bind:value={$formData.loadedSelector} />
		</Form.Control>
		<!-- <Form.Description>
			Selector for an element that is present when the page is correctly loaded.
		</Form.Description> -->
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="waitForSelectorToLoad">
		<Form.Control let:attrs>
			<Form.Label>
				Wait for selector to load
				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="waitForSelectorToLoad_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>Extractor will wait for this selector to load for the amount of time specified in the
						loading timeout.</Tooltip.Content
					>
				</Tooltip.Root>
				<Badge variant="outline">CSS</Badge>
			</Form.Label>
			<Input placeholder={`div.content`} {...attrs} bind:value={$formData.waitForSelectorToLoad} />
		</Form.Control>
		<!-- <Form.Description
			>Extractor will wait for this selector to load for the amount of time specified in the loading
			timeout.</Form.Description
		> -->
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="resultsTarget">
		<Form.Control let:attrs>
			<Form.Label
				>Results target
				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="resultsTarget_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>Number of results after which the extracting stops. In case of pagination, a results
						target must be set.</Tooltip.Content
					>
				</Tooltip.Root>
			</Form.Label>
			<Input placeholder="0" {...attrs} bind:value={$formData.resultsTarget} type="number" />
		</Form.Control>
		<Form.Description class="inline-flex gap-2">
			<Icons.CircleAlert class="mt-1 size-4 text-orange-200" /> This field enables pagination. If target
			is not hit, pagination will not be triggered.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="loadingTimeout">
		<Form.Control let:attrs>
			<Form.Label
				>Loading timeout

				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="loadingTimeout_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40">Length of timeout</Tooltip.Content>
				</Tooltip.Root>
			</Form.Label>
			<Input
				placeholder={`//h1[contains(text(),"Denied")]`}
				{...attrs}
				bind:value={$formData.loadingTimeout}
				type="hidden"
			/>
			<span class="flex items-center">
				<Slider
					bind:value={slider}
					max={60000}
					min={1000}
					step={1000}
					class="mx-2 my-4 max-w-[70%]"
					onValueChange={(e) => ($formData.loadingTimeout = e[0])}
				/>
				<span class="text-xs font-medium"
					>{`${$formData.loadingTimeout}ms (${+$formData.loadingTimeout / 1000}s)`}</span
				>
			</span>
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="noResultsXPath">
		<Form.Control let:attrs>
			<Form.Label>
				No results

				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="noResultsXPath_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>XPath of element from a page where results are not present.</Tooltip.Content
					>
				</Tooltip.Root>
				<Badge variant="outline">XPath</Badge>
			</Form.Label>
			<Input
				placeholder={`//h1[contains(text(),"404")]`}
				{...attrs}
				bind:value={$formData.noResultsXPath}
			/>
		</Form.Control>
		<!-- <Form.Description>XPath of element from a page where results are not present.</Form.Description> -->
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="accessDeniedXPath">
		<Form.Control let:attrs>
			<Form.Label>
				Access denied

				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="accessDeniedXPath_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>XPath of element from a page where extractor is blocked by anti-bot.</Tooltip.Content
					>
				</Tooltip.Root>
				<Badge variant="outline">XPath</Badge>
			</Form.Label>
			<Input
				placeholder={`//h1[contains(text(),"Denied")]`}
				{...attrs}
				bind:value={$formData.accessDeniedXPath}
			/>
		</Form.Control>
		<!-- <Form.Description>XPath of element from a page where results are not present.</Form.Description> -->
		<Form.FieldErrors />
	</Form.Field>

	<div>
		<Form.Fieldset {form} name="orderedSelectorsToClickOn">
			<Form.Legend>
				Ordered selectors to click on
				<Tooltip.Root openDelay={0} group>
					<Tooltip.Trigger id="orderedSelectorsToClickOn_tooltip">
						<Icons.Info class="size-3 text-sky-700" />
						<span class="sr-only">Info</span>
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-40"
						>These selectors will be clicked on when extractor lands on the page. Commonly used for
						modals, side panels, popovers, etc.</Tooltip.Content
					>
				</Tooltip.Root>
				<Badge variant="outline">CSS</Badge>
			</Form.Legend>
			{#each $formData.orderedSelectorsToClickOn as _, i}
				<Form.ElementField {form} name="orderedSelectorsToClickOn[{i}]">
					<!-- <Form.Description class={cn(i !== 0 && 'sr-only')}>
						These selectors will be clicked on when extractor lands on the page. Commonly used for
						modals, side panels, popovers, etc.
					</Form.Description> -->
					<Form.Control let:attrs>
						<Input
							{...attrs}
							bind:value={$formData.orderedSelectorsToClickOn[i]}
							placeholder="div#modal"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" on:click={addOrderedSelector}>
			Add Selector
		</Button>
	</div>
	<!-- 
	<Form.Button>Update profile</Form.Button> -->
</form>
<Separator class="my-6" />
{#if browser}
	<SuperDebug data={$formData} />
{/if}
