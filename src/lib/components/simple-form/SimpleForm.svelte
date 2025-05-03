<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from '$lib/components/simple-form/types';

	let { data }: { data?: Event } = $props();

    const buttonText = data?.id ? 'Update Event' : 'Create Event';

	let title = $state(data?.title || '');
	let description = $state(data?.description || '');
	let date = $state(data?.date || '');

	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			await update({
				reset: false
			});

			loading = false;
		};
	}}
>
	<!-- form for creating/editing events -->
	<label for="title">Title</label>

	<!-- Hidden field to be sure we send the id with event updates TODO find a better way -->
	<input type="hidden" name="id" value={data?.id} />
	<input type="text" id="title" name="title" bind:value={title} required disabled={loading} />

	<label for="description">Description</label>
	<textarea
		id="description"
		name="description"
		bind:value={description}
		rows="4"
		cols="50"
		placeholder="Description"
		disabled={loading}
	></textarea>

	<label for="date">Date</label>
	<input
		type="datetime-local"
		id="date"
		name="date"
		bind:value={date}
		required
		disabled={loading}
	/>

	<button type="submit" disabled={loading}>
		{loading ? 'Loading...' : buttonText}
	</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 5rem;
		gap: 1rem;
	}

	button {
		align-self: flex-center;
		border: 2px solid black;
		padding: 0.5rem 2rem;
	}
</style>
