<script lang="ts" context="module">
	import { z } from 'zod';

	export const profileFormSchema = z.object({
		resultsTarget: z.string().nullable().default(null),
		loadedSelector: z.string().nullable().default(null),
		waitForSelectorToLoad: z.string().nullable().default(null),
		noResultsXPath: z.string().default('//h1[contains(text(),"404")]'),
		accessDeniedXPath: z.string().default('//h1[contains(text(),"Denied")]'),
		orderedSelectorsToClickOn: z.array(z.string()).default(['']),
		loadingTimeout: z.number().default(5000),
		checkXpathBeforeExtract: z.string().nullable().default(null),
		URLTemplate: z.string().nullable().default(null),
		setZipCode: setZipCode.default({}),
		zipcode: z.string().nullable().default(null),
		storeID: z.string().nullable().default(null),
		useGoto2: z.boolean().default(true),
		schemaYAML: z.string().default('singlePage'),
		mergeType: z.enum(['APPEND', 'REPLACE']).default('APPEND'),
		maxScrolls: z.number().default(3),
		arrayOfInputFieldNamesToAdd: z.array(z.string()).nullable().default(null),
		addAttributeToExtractedRecords: z.any().nullable().default(null),
		enableAutoTable: z.boolean().default(true),
		domain: z.string().default('amazon'),
		paginate: paginateSchemaRaw
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

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
	import { paginateSchemaRaw, setZipCode } from '$lib/schema';

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	$: slider = [+$formData.loadingTimeout];

	function addOrderedSelector() {
		$formData.orderedSelectorsToClickOn = [...$formData.orderedSelectorsToClickOn, ''];

		tick().then(() => {
			const orderedSelectors = Array.from(
				document.querySelectorAll<HTMLElement>(
					"#profile-form input[name='orderedSelectorsToClickOn']"
				)
			);
			const lastSelector = orderedSelectors[orderedSelectors.length - 1];
			lastSelector && lastSelector.focus();
		});
	}
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="resultsTarget">
		<Form.Control let:attrs>
			<Form.Label>Results target</Form.Label>
			<Input placeholder="0" {...attrs} bind:value={$formData.resultsTarget} type="number" />
		</Form.Control>
		<Form.Description>
			Number of results after which the extracting stops. In case of pagination, a results target
			must be set.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="loadedSelector">
		<Form.Control let:attrs>
			<Form.Label>
				Loaded selector
				<Badge variant="secondary">css</Badge>
			</Form.Label>
			<Input placeholder={`main#page`} {...attrs} bind:value={$formData.loadedSelector} />
		</Form.Control>
		<Form.Description>
			Selector for an element that is present when the page is correctly loaded.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="waitForSelectorToLoad">
		<Form.Control let:attrs>
			<Form.Label>
				Wait for selector to load
				<Badge variant="secondary">css</Badge>
			</Form.Label>
			<Input placeholder={`div.content`} {...attrs} bind:value={$formData.waitForSelectorToLoad} />
		</Form.Control>
		<Form.Description
			>Extractor will wait for this selector to load for the amount of time specified in the loading
			timeout.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="loadingTimeout">
		<Form.Control let:attrs>
			<Form.Label>Loading timeout</Form.Label>
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
				<Badge variant="outline">xpath</Badge>
			</Form.Label>
			<Input
				placeholder={`//h1[contains(text(),"404")]`}
				{...attrs}
				bind:value={$formData.noResultsXPath}
			/>
		</Form.Control>
		<Form.Description>XPath of element from a page where results are not present.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="accessDeniedXPath">
		<Form.Control let:attrs>
			<Form.Label>
				Access denied
				<Badge variant="outline">xpath</Badge>
			</Form.Label>
			<Input
				placeholder={`//h1[contains(text(),"Denied")]`}
				{...attrs}
				bind:value={$formData.accessDeniedXPath}
			/>
		</Form.Control>
		<Form.Description>XPath of element from a page where results are not present.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div>
		<Form.Fieldset {form} name="orderedSelectorsToClickOn">
			<Form.Legend>
				Ordered selectors to click on
				<Badge variant="secondary">css</Badge>
			</Form.Legend>
			{#each $formData.orderedSelectorsToClickOn as _, i}
				<Form.ElementField {form} name="orderedSelectorsToClickOn[{i}]">
					<Form.Description class={cn(i !== 0 && 'sr-only')}>
						These selectors will be clicked on when extractor lands on the page. Commonly used for
						modals, side panels, popovers, etc.
					</Form.Description>
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

	<Form.Button>Update profile</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
