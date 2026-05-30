<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { WebGLRenderer } from 'three';
	import FaceMask from '$lib/components/FaceMask.svelte';
	import type { FaceLandmarkRef } from '$lib/types';

	let { landmarkRef, videoElement, cameraReady } = $props<{
		landmarkRef: FaceLandmarkRef;
		videoElement: HTMLVideoElement | undefined;
		cameraReady: boolean;
	}>();
</script>

<div class="absolute inset-0 z-10">
	<Canvas createRenderer={(canvas) => new WebGLRenderer({ canvas, alpha: true, antialias: true })}>
		<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

		<T.AmbientLight intensity={0.42} color="#ffffff" />

		<T.DirectionalLight position={[4, 2.5, 5]} intensity={1.2} color="#ffffff" />

		<T.DirectionalLight position={[-4, 0, 3]} intensity={1.7} color="#ffffff" />

		<T.DirectionalLight position={[0, 8, 1]} intensity={1.15} color="#ffffff" />

		{#if cameraReady && videoElement}
			<FaceMask {landmarkRef} {videoElement} />
		{/if}
	</Canvas>
</div>
