<script lang="ts">
	let { loading, error } = $props<{
		loading: boolean;
		error: string | null;
	}>();
</script>

{#if loading && !error}
	<div
		class="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black text-white transition-opacity duration-300"
	>
		<div class="relative h-10 w-10">
			<div
				class="absolute inset-0 animate-spin rounded-full border border-white/15 border-t-white/80"
			></div>
		</div>

		<p class="text-sm text-white/60">Loading...</p>
	</div>
{/if}

{#if error}
	<div class="absolute inset-0 z-50 flex items-center justify-center bg-black p-4 text-white">
		<div class="w-full max-w-md text-center">
			<h3 class="mb-3 text-sm font-medium text-red-500">Camera unavailable</h3>
			<p class="text-sm leading-relaxed text-white/70">{error}</p>
		</div>
	</div>
{/if}
