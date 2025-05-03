<script lang="ts">
	import { enhance } from '$app/forms';

	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			await update();

			loading = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required disabled={loading} />
	<textarea
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		disabled={loading}
	></textarea>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required disabled={loading} />
	<button type="submit">Create Event</button>
</form>

{#if loading}
	<span>Loading.....</span>
{/if}
