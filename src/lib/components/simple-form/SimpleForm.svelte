<script lang="ts">
	import { enhance } from '$app/forms';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import Toast from '../toast/Toast.svelte';
	import type { Event } from '$lib/components/simple-form/types';
	import { redirect } from '@sveltejs/kit';

	let { data }: { data?: Event } = $props();

    const buttonText = data?.id ? 'Update Event' : 'Create Event';

	let title = $state(data?.title || '');
	let description = $state(data?.description || '');
	let date = $state(data?.date || '');

    let userMessage = $state({ success: true, message: '' });

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

            // Note to self, let {form} = $props() data is only updated in Actions on the top route level
            // Use page data to get form updates in this nested component
            if (page?.form?.message) {
                userMessage = page.form;
            }

			loading = false;

            // Optional client side redirect
            if (page?.form?.redirect) {
                goto(page?.form?.redirect);
            }
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

<Toast input={userMessage} />


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
