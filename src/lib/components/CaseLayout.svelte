<script lang="ts">
	import { asset } from '$app/paths';

	export let image: string;
	export let alt: string = '';
    export let image_bot: boolean = true;
</script>

<div class="flex flex-col items-center justify-center h-full">
    {#if !image_bot}
        <div class="text-lg">
            <slot />
        </div>
    {/if}

	<img
		src={asset(image)}
		alt={alt}
		class="max-w-full max-h-80 rounded shadow mt-8 self-center"
	/>

    {#if image_bot}
        <div class="text-lg">
            <slot />
        </div>
    {/if}
</div>