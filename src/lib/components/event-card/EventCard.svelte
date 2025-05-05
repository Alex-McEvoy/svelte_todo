<script>
	/**
	 * @component EventCard
	 * @description
	 * A reusable component that represents an individual event card.
	 * This component is designed to display event-related information
	 * such as title, date, location, and other relevant details.
	 *
	 * @props
	 * - `eventData` (Object): The data object containing event details
	 *   such as title, date, and location.
	 */

	let { event, deleteEvent, deletingId } = $props();
</script>

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
	<button class="delete_button" disabled={!!deletingId} onclick={() => deleteEvent(event?.id)}>
		<img src="/trash.svg" alt="Trash icon" width="24" height="24" />
	</button>
</div>

<style>
	.event_card {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		position: relative;
		border: 1px solid #ccc;
		padding: 16px;
		margin: 2px 0;
		opacity: 90%;
		background-color: white;
		border-radius: 15px;
		text-decoration: none;
		color: inherit;
		width: 100%;
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

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		text-decoration: none;
		border-radius: 4px;
	}

	button:hover {
		background-color: #7c7e81;
	}

	button:active {
		background-color: #004085;
	}
</style>
