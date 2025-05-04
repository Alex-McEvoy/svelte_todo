<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { EventCard, LOADING_CONTEXT_KEY } from '$lib';
	import type { LoadingContext } from '$lib';

	let { data }: { data: PageData } = $props();

	let eventsPromise = $state(data.events);
	let deletingId: number | null = $state(null);

	const { isLoading } = getContext<LoadingContext>(LOADING_CONTEXT_KEY);

	// Set loading to true on mount
	onMount(() => {
		isLoading.set(true);
	});

	$effect(() => {
		eventsPromise
		.then(() => isLoading.set(false))
		.catch(() => isLoading.set(false));
	});

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

<div class="events_container">
	{#await eventsPromise}
		<p>Loading...</p>
	{:then events}
		{#each events as event}
			<EventCard {event} {deleteEvent} {deletingId} />
		{/each}
	{:catch error}
		<p>Error loading event: {error.message}</p>
	{/await}
</div>

<a class="newEvent_container" href="/new-event" role="button">
	<img src="/plusIcon.svg" alt="Add Event" class="newEvent_icon" width="24" height="24" />
	<div class="newEvent_button">Add Event</div>
</a>

<style>
	.events_container {
		width: 100%;
		max-height: 98vh;
		overflow: scroll;
		gap: 5px;
		border-radius: 10px;
		mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
		margin-bottom: 1%;
	}

	.events_loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.newEvent_container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		justify-self: flex-end;
		width: 100%;
		margin-top: auto;
		background-color: white;
		padding-left: 2%;
		border-radius: 3px;
	}

	.newEvent_button {
		display: inline-block;
		padding: 8px 16px;
	}
</style>
