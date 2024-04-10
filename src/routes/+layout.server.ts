import type { LayoutServerLoad } from './$types.js';
import dirTree from 'directory-tree';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { indexSchema, singlePageSchema, dataJSONSchema } from '$lib/schema.js';

const tree = dirTree('src/routes', {
	extensions: /\.(js|yaml)$/
});

const routes = {
	...tree,
	children: tree.children?.filter((route) => route.name === 'library' || route.name === 'orgs')
};

export const load: LayoutServerLoad = async (event) => {
	const layoutCookie = event.cookies.get('PaneForge:layout');
	const collapsedCookie = event.cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined = undefined;
	let collapsed: boolean | undefined = undefined;

	layoutCookie && (layout = JSON.parse(layoutCookie));
	collapsedCookie && (collapsed = JSON.parse(collapsedCookie));

	return {
		layout,
		collapsed,
		routes,
		forms: {
			indexForm: await superValidate(zod(indexSchema)),
			singlePageForm: await superValidate(zod(singlePageSchema)),
			dataJSONForm: await superValidate(zod(dataJSONSchema))
		}
	};
};
