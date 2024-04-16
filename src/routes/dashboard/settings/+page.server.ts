import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, type Actions } from '@sveltejs/kit';
import { indexSchema } from '$lib/schema.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(indexSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(indexSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
