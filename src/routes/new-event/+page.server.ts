import { error, fail, isRedirect } from "@sveltejs/kit";
import { validateEventFormData } from "$lib";
import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request}) => {
        try {
            const formData = await request.formData();
    
			const result = validateEventFormData(formData);

			if (!result.success) {
                return fail(400, result);
            }

			const { title = '', description, date = '' } = result;

            const newEvent = await createEvent({ title, description, date });
            
            return {success: true, message: 'Event Updated!', redirect: `/${newEvent.id}`};
        } catch (err) {
            // This "threw" me at first (dad chuckle). SvelteKit catches all redirects in the catch block
            // which looks like an error, but offers this utility to check this particular situation
            if (isRedirect(err)) throw err
            return error(500, { message: 'Unexpected failure during create event' });
        }
    }
}