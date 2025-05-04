<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let eventsPromise = $state(data.events);
	let deletingId: number | null = $state(null);

	async function deleteEvent(id: number) {
		try {
			deletingId = id;
			await fetch(`/${id}`, {
				method: 'DELETE'
			});

			const currentEvents = await eventsPromise;
			const updatedEvents = currentEvents.filter((e) => e.id !== id);

			eventsPromise = Promise.resolve([...updatedEvents]);
		} catch (error) {
			// TODO surface this to the user
			console.error('Delete failed', error);
		} finally {
			deletingId = null;
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1 class="text-xl">Events</h1>

<div class="events_container">
	{#await eventsPromise}
		<p>Loading...</p>
	{:then events}
		{#each events as event}
			<div class="event_card {deletingId === event.id ? 'deleting' : ''}">
				{#if deletingId === event.id}
					<div class="overlay">Deleting...</div>
				{/if}

				<a href={`/${event?.id}`} class:disabled={!!deletingId}>
					<div class="card_content">
						<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
						<p>{event.description}</p>
						<p>{event.date}</p>
					</div>
				</a>
				<button
					class="delete_button"
					disabled={!!deletingId}
					onclick={() => deleteEvent(event?.id)}
				>
					<img src="/trash.svg" alt="Trash icon" width="24" height="24" />
				</button>
			</div>
		{/each}
	{:catch error}
		<p>Error loading event: {error.message}</p>
	{/await}
</div>

<a class="newEvent_button" href="/new-event" role="button">Add Event</a>

<style>
	.events_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
	.event_card {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #ccc;
		padding: 16px;
		margin: 8px 0;
		border-radius: 4px;
		text-decoration: none;
		color: inherit;
		min-width: 25%;
	}

	.event_card:hover {
		background-color: #f9f9f9;
		box-shadow: 10px 5px 5px grey;
	}

	.event_card.deleting {
		opacity: 0.5;
		pointer-events: none;
	}

	.event_card .overlay {
		position: absolute;
		left: 0;
		right: 0;
		margin-inline: auto;
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.8);
		font-size: 1.25rem;
		font-weight: bold;
		z-index: 1;
		border-radius: 4px;
	}

	.newEvent_button {
		display: inline-block;
		padding: 8px 16px;
		background-color: #007bff;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		text-decoration: none;
		border-radius: 4px;
	}

	button:hover {
		background-color: #32455a;
	}

	button:active {
		background-color: #004085;
	}
</style>
