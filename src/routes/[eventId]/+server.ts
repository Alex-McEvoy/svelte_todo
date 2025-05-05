import { deleteEventById } from '$lib/server/remote-events';

export async function DELETE ({ params }: { params: { eventId: string } }) {
    const eventId = parseInt(params.eventId);
    
    await deleteEventById(eventId);

    return new Response(null, { status: 200 });
};