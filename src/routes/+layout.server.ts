// import type { LayoutData } from './$types.js';
import type { LayoutServerLoad } from './$types.js';
import dirTree from 'directory-tree';

const tree = dirTree('src/routes/library');

export const load: LayoutServerLoad = async (event) => {
	const layoutCookie = event.cookies.get('PaneForge:layout');
	const collapsedCookie = event.cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined = undefined;
	let collapsed: boolean | undefined = undefined;

	layoutCookie && (layout = JSON.parse(layoutCookie));
	collapsedCookie && (collapsed = JSON.parse(collapsedCookie));

	return { layout, collapsed, tree: { path: tree.path, name: tree.name, children: tree.children } };
};
