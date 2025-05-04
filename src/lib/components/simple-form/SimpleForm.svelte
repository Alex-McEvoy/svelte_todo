<script lang="ts">
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { LOADING_CONTEXT_KEY, Toast } from '$lib';
	import type { Event, LoadingContext } from '$lib';

	let { data }: { data?: Event } = $props();

	const buttonText = data?.id ? 'Update Event' : 'Create Event';

	let title = $state(data?.title || '');
	let description = $state(data?.description || '');
	let date = $state(data?.date || '');

	let userMessage = $state({ success: true, message: '' });

	const { isLoading } = getContext<LoadingContext>(LOADING_CONTEXT_KEY);

	let currentlyLoading = $state($isLoading);
</script>

<form
	method="POST"
	use:enhance={() => {
		isLoading.set(true);

		return async ({ update }) => {
			await update({
				reset: false
			});

			// Note to self, let {form} = $props() data is only updated in Actions on the top route level
			// Use page data to get form updates in this nested component
			if (page?.form?.message) {
				userMessage = page.form;
			}

			isLoading.set(false);

			// Optional client side redirect
			if (page?.form?.redirect) {
				goto(page?.form?.redirect);
			}
		};
	}}
>
	<!-- Hidden field to be sure we send the id with event updates TODO find a better way -->
	<input type="hidden" name="id" value={data?.id} />
	<div class="inputWrapper">
		<input
			type="text"
			id="title"
			name="title"
			placeholder=" "
			bind:value={title}
			required
			disabled={currentlyLoading}
		/>
		<label for="title">Title</label>
	</div>

	<div class="inputWrapper">
		<textarea
			id="description"
			class="description"
			name="description"
			bind:value={description}
			rows="4"
			cols="50"
			placeholder=" "
			disabled={currentlyLoading}
		></textarea>
		<label class="description-placeholder" for="description">Description</label>
	</div>

	<div class="inputWrapper">
		<input
			type="datetime-local"
			id="date"
			name="date"
			bind:value={date}
			required
			disabled={currentlyLoading}
		/>
		<label for="date">Date</label>
	</div>

	<button type="submit" disabled={currentlyLoading}>
		{currentlyLoading ? 'Loading...' : buttonText}
	</button>
</form>

<Toast input={userMessage} />

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		max-width: 100%;
		height: 80%;
		overflow: hidden;
		gap: 1rem;
		background: linear-gradient(to top right, #571d89, #e0697d);
		opacity: 98%;
	}

	.description {
		width: -webkit-fill-available;
		outline: none;
		box-shadow: none;
		border-color: black;
		transform: scale(1.02);
		transition: transform 0.2s ease-in-out;
		background: none;
	}

	.inputWrapper {
		position: relative;
		width: 80%;
	}

	.inputWrapper input {
		width: 100%;
		padding: 14px 12px;
		font-size: 16px;
		background: none;
		border: none;
		border-bottom: 2px solid black;
		outline: none;
	}

	.inputWrapper label {
		position: absolute;
		left: 0;
		top: 40%;
		color: #aaa;
		font-size: 16px;
		pointer-events: none;
		transition: all 0.2s ease;
		background: none;
		padding: 0 4px;
	}

	.inputWrapper .description-placeholder {
		top: 0;
	}

	/* Floating label */
	.inputWrapper input:focus + label,
	.inputWrapper input:not(:placeholder-shown) + label {
		top: -15px;
		left: 0px;
		font-size: 12px;
		color: #000;
	}

	.inputWrapper textarea:focus + label,
	.inputWrapper textarea:not(:placeholder-shown) + label {
		top: -15px;
		left: 0px;
		font-size: 12px;
		color: #000;
	}

	input:focus {
		outline: none;
		box-shadow: none;
		border-color: black;
		transform: scale(1.02);
		transition: transform 0.2s ease-in-out;
	}

	button {
		align-self: flex-center;
		border: 2px solid black;
		padding: 0.5rem 2rem;
		background: white;
	}
</style>
