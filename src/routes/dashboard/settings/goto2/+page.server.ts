import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
import { fail, type Actions } from '@sveltejs/kit';
import { goto2Schema } from '$lib/schema.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(goto2Schema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(goto2Schema));
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
