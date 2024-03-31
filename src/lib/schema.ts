import { z } from 'zod';

export const nextLinkSchema = z.object({
	nextLinkSelectorOrXpath: z.string().nullable().default(null),
	mutationSelectorOrXpath: z.string().nullable().default(null),
	spinnerSelectorOrXpath: z.string().nullable().default(null),
	nextLinkTimeout: z.number().nullable().default(null),
	waitForXpath: z.string().nullable().default(null)
});

export const infiniteScrollSchema = z.object({
	maxScrolls: z.number().nullable().default(null),
	stopXPath: z.string().nullable().default(null),
	waitTime: z.number().nullable().default(null)
});

export const openSearchDefinitionSchema = z.object({
	template: z.string().nullable().default(null),
	pageStartNb: z.number().nullable().default(null),
	indexOffset: z.number().nullable().default(null),
	pageOffset: z.number().nullable().default(null),
	pageIndexMultiplier: z.number().nullable().default(null)
});

export const nestedPaginationRaw = z.object({
	nextDepthURLFieldName: z.string().nullable().default(null),
	paginate: z.object({}).nullable().default(null)
});

export const paginateSchemaRaw = z.object({
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

export const setZipCode = z
	.object({
		checkZipCodeSelectorOrXPath: z.string().nullable().default(null),
		maxTries: z.number().default(1),
		setZipWithUI: setZipWithUISchema.default({})
	})
	.default({ maxTries: 1, setZipWithUI: {} });
