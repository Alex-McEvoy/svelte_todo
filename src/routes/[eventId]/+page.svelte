<script lang="ts">
	import type { PageData } from "./$types";
    import { SimpleForm } from '$lib';

    let {data}: {data: PageData} = $props();
</script>


<div>
    {#if data.event}
        <SimpleForm data={data.event} />
    {/if}
</div>