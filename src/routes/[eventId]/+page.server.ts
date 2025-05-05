import { error, fail } from "@sveltejs/kit";
import { validateEventFormData } from "$lib";
import { fetchEventById, updateEventById } from "$lib/server/remote-events";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    return {
        event
    }
}

export const actions: Actions = {
    default: async ({request}) => {
        try {
            const formData = await request.formData();
            const id = parseInt(formData.get('id')?.toString() || '', 10);
    
			const result = validateEventFormData(formData);

			if (!result.success) {
                return fail(400, result);
            }

			const { title, description, date } = result;

            await updateEventById(id, {title, description, date});

            return {success: true, message: 'Event Updated!'}
        }  catch (err) {
            console.error(err);
            return error(500, { message: 'Unexpected failure during update event' });
        }


    }
}