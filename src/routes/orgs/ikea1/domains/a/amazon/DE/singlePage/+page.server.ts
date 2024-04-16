import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, type Actions } from '@sveltejs/kit';
import { singlePageSchema } from '$lib/schema.js';

export const load = async () => {
	return {
		form: await superValidate(zod(singlePageSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(singlePageSchema));
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
