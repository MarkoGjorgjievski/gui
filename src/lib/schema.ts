import { z } from 'zod';

const nextLinkSchema = z.object({
	nextLinkSelectorOrXpath: z.string().nullable().default(null),
	mutationSelectorOrXpath: z.string().nullable().default(null),
	spinnerSelectorOrXpath: z.string().nullable().default(null),
	nextLinkTimeout: z.number().nullable().default(null),
	waitForXpath: z.string().nullable().default(null)
});

const infiniteScrollSchema = z.object({
	maxScrolls: z.number().nullable().default(null),
	stopXPath: z.string().nullable().default(null),
	waitTime: z.number().nullable().default(null)
});

const openSearchDefinitionSchema = z.object({
	template: z.string().nullable().default(null),
	pageStartNb: z.number().nullable().default(null),
	indexOffset: z.number().nullable().default(null),
	pageOffset: z.number().nullable().default(null),
	pageIndexMultiplier: z.number().nullable().default(null)
});

const nestedPaginationRaw = z.object({
	nextDepthURLFieldName: z.string().nullable().default(null),
	paginate: z.object({}).nullable().default(null)
});

const paginateSchemaRaw = z.object({
	stopConditionSelectorOrXpath: z.string().nullable().default(null),
	nextLink: nextLinkSchema.default({}),
	infiniteScroll: infiniteScrollSchema.default({}),
	openSearchDefinition: openSearchDefinitionSchema.default({}),
	nestedPagination: nestedPaginationRaw
});

const setZipWithUISchema = z.object({
	beforeInputSelectorOrXpathArray: z.array(z.string()).nullable().default(null),
	inputSelectorOrXPath: z.string().nullable().default(null),
	afterInputSelectorOrXPathArray: z.array(z.string()).nullable().default(null),
	wait: z.number().default(3000)
});

const setZipCode = z
	.object({
		checkZipCodeSelectorOrXPath: z.string().nullable().default(null),
		maxTries: z.number().default(1),
		setZipWithUI: setZipWithUISchema.default({})
	})
	.default({ maxTries: 1, setZipWithUI: {} });

export const indexSchema = z.object({
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

export type IndexSchema = typeof indexSchema;

export const countries = [
	{ label: 'United Kingdom', value: 'UK' },
	{ label: 'France', value: 'FR' },
	{ label: 'Germany', value: 'DE' },
	{ label: 'Spain', value: 'ES' },
	{ label: 'Portugal', value: 'PT' },
	{ label: 'Russia', value: 'RU' },
	{ label: 'Japan', value: 'JP' },
	{ label: 'South Korea', value: 'KO' },
	{ label: 'Belgium', value: 'BE' }
] as const;

type Country = (typeof countries)[number]['value'];

export const goto2Schema = z.object({
	blockUnnecessaryRequests: z
		.array(z.enum(['xhr', 'script', 'font', 'stylesheet']))
		.default(['xhr', 'script', 'font', 'stylesheet']),
	setBlockAds: z.boolean().default(false),
	setBypassCSP: z.boolean().default(true),
	setLoadAllResources: z.boolean().default(true),
	setLoadImages: z.boolean().default(true),
	setCssEnabled: z.boolean().default(true),
	applyIgnoreVBAndCookies: z.any().nullable().default(null),
	optTags: z.any().nullable().default(null),
	timeout: z.number().default(60000),
	waitUntil: z.enum(['networkidle0', 'networkidle1', 'networkidle2']).default('networkidle0'),
	acceptCookiesCSSSelector: z.string().nullable().default(null),
	captchaSelectors: z.record(z.string(), z.unknown()).default({}),
	submitCaptchaButtonCSS: z.string().nullable().default(null),
	waitAfterNavObject: z
		.object({
			wrongRedirectSelector: z.string().default(''),
			selector: z.string().default(''),
			selectorType: z.string().default(''),
			delay: z.number().nullable().default(null)
		})
		.default({
			wrongRedirectSelector: '',
			selector: '',
			selectorType: '',
			delay: null
		}),
	store: z.any().nullable().default(null),
	country: z.enum(countries.map((country) => country.value) as [Country, ...Country[]]),
	gotoRetries: z.number().nullable().default(null),
	rawOptions: z
		.object({
			checkBlocked: z.boolean().default(true)
		})
		.default({ checkBlocked: true }),
	domain: z.string().default('amazon'),
	schemaYAML: z.string().default('multiPages')
});

export type Goto2Schema = typeof goto2Schema;

export const blockUnnecessaryRequests = [
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

export const singlePageSchema = z.object({
	alternative_images: z.array(z.string()),
	average_rating: z.string(),
	chain_param: z.string(),
	colour: z.array(z.string()),
	country: z.string(),
	currency: z.string(),
	depth: z.string(),
	description: z.array(z.string()),
	diameter: z.string(),
	dimensions: z.array(z.string()),
	dimensions_unit: z.string(),
	height: z.string(),
	length: z.string(),
	listing_id: z.string(),
	listing_url: z.string(),
	main_image: z.string(),
	materials: z.array(z.string()),
	offer_price: z.string(),
	original_price: z.string(),
	pack_size: z.string(),
	platform_category: z.string(),
	platform_id: z.string(),
	production: z.string(),
	product_details: z.array(z.string()),
	product_title: z.string(),
	product_variations: z.array(z.string()),
	source_ikea_product_area: z.string(),
	source_url: z.string(),
	stock_availability: z.string(),
	timestamp: z.string(),
	user_reviews: z.string(),
	volume: z.string(),
	weight: z.string(),
	weight_raw: z.string(),
	weight_unit: z.string(),
	width: z.string()
});

export type SinglePageSchema = typeof singlePageSchema;

export const dataJSONSchema = z.object({
	weight: z.string(),
	weight_raw: z.string(),
	weight_unit: z.string(),
	width: z.string()
});

export type DataJSONSchema = typeof dataJSONSchema;
