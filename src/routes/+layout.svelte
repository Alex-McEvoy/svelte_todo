<script lang="ts">
	/**
	 * @component Layout
	 * @description
	 * The root layout component for the application.
	 * This component serves as the base structure for all pages,
	 * providing shared layout elements such as headers, footers,
	 * or navigation that persist across different routes.
	 */
	
	import { setContext } from 'svelte';
	import '../app.css';
	import { isLoading, LOADING_CONTEXT_KEY } from '$lib';

	let { children } = $props();

	setContext(LOADING_CONTEXT_KEY, { isLoading });
</script>

<div class="document_container">
	<div class="header_container">
		<div class="header_left-column">
			<h1>My Events</h1>
			<p>
				{new Date()
					.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
					.replace(/(\d+)(?=,)/, (match) => `${match}th`)}
			</p>
		</div>
		<nav class="nav">
			<a href="/">home</a>
		</nav>
	</div>

	{#if $isLoading}
		<div class="loadingModal">
			<img
				src="/Spinner@1x-1.0s-200px-200px.svg"
				alt="Loading..."
				class="spinner"
				style="width: 100px; height: 100px;"
			/>
		</div>
	{/if}

	{@render children()}
</div>

<style>
	.document_container {
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: center;
		height: 100vh;
		width: 100%;
		padding: 0.5% 3% 3%;
		background-image: url('/damian-patkowski-T-LfvX-7IVg-unsplash.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.header_container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
		padding: 10px;
		font-size: 1.5rem;
		border-bottom: 1px solid black;
		margin-bottom: 10px;
		line-height: 2rem;
	}

	.header_left-column {
		display: flex;
		flex-flow: column;
	}

	.nav {
		margin-left: auto;
		border-bottom: 1px solid black;
	}

	.loadingModal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>
