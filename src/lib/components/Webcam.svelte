<script lang="ts">
	import { onMount } from 'svelte';

	let {
		videoElement = $bindable(),
		onCameraReady,
		onError
	} = $props<{
		videoElement: HTMLVideoElement | undefined;
		onCameraReady: () => void;
		onError: (msg: string) => void;
	}>();

	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: 'user',
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			});

			if (videoElement) {
				videoElement.srcObject = stream;
				videoElement.onloadeddata = () => {
					onCameraReady();
				};
			}
		} catch (err) {
			console.error(err);
			onError('Camera permission denied or camera unavailable.');
		}
	});
</script>

<video
	bind:this={videoElement}
	autoplay
	playsinline
	muted
	class="mirror-x pointer-events-none absolute inset-0 h-full w-full object-cover"
></video>

<style>
	.mirror-x {
		transform: scaleX(-1);
	}
</style>
