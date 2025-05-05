<script lang="ts">
	/**
	 * @component Toast
	 * @description
	 * A reusable component for displaying toast notifications.
	 * This component is designed to show brief messages to the user,
	 * such as success, error, or informational alerts, and automatically
	 * dismisses after a specified duration.
	 *
	 * @props
	 * - `message` (string): The text content of the toast notification.
	 * - `type` (string): The type of the toast (e.g., 'success', 'error', 'info')
	 *   to determine its styling.
	 * - `duration` (number): The duration in milliseconds for which the toast
	 *   will be visible before automatically dismissing.
	 */

	import { fly, fade } from 'svelte/transition';

	let { input } = $props();

	let isVisible = $state(true);
	const onDismiss: () => void = () => (isVisible = false);

	$effect(() => {
		isVisible = input?.message ? true : false;
	});
</script>

{#if input?.message && isVisible}
	<div
		class="toast {input.success ? 'success' : 'error'}"
		in:fly={{ y: 100, duration: 300 }}
		out:fade={{ duration: 200 }}
	>
		{input.message}

		<button class="close-btn" onclick={onDismiss} aria-label="Close"> &times; </button>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		bottom: 2rem;
		display: flex;
		justify-content: space-between;
		flex-flow: row;
		left: 50%;
		transform: translateX(-50%);
		padding: 1rem 2rem;
		border-radius: 6px;
		color: white;
		font-weight: bold;
		z-index: 9999;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	.success {
		background-color: #2ecc71;
	}

	.error {
		background-color: #e74c3c;
	}
</style>
