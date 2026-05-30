<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	import { maskState } from '$lib/runes/maskState.svelte';
	import { FACE_MESH_TRIANGULATION } from '../utils/FaceTriangulation';
	import { FACE_MESH_UVS } from '../utils/FaceUVs';
	import type { FaceLandmarkRef } from '$lib/types';

	let { landmarkRef, videoElement } = $props<{
		landmarkRef: FaceLandmarkRef;
		videoElement: HTMLVideoElement | null;
	}>();

	const { camera, size } = useThrelte();

	let mesh = $state<THREE.Mesh>();
	let geometry = $state<THREE.BufferGeometry>();
	let material = $state<THREE.MeshPhysicalMaterial>();

	const vertexCount = 468;
	const indices = new Uint16Array(FACE_MESH_TRIANGULATION);
	const positions = new Float32Array(vertexCount * 3);
	const uvs = FACE_MESH_UVS;

	const MATERIAL_SIDE: Record<string, THREE.Side> = {
		front: THREE.FrontSide,
		back: THREE.BackSide,
		double: THREE.DoubleSide
	};

	$effect(() => {
		if (material) {
			material.map = null;
			material.color.set(maskState.color);
			material.opacity = maskState.opacity;
			material.metalness = maskState.metalness;
			material.roughness = maskState.roughness;
			material.clearcoat = maskState.clearcoat;
			material.clearcoatRoughness = maskState.clearcoatRoughness;
			material.ior = maskState.ior;
			material.transmission = maskState.transmission;
			material.thickness = maskState.thickness;
			material.iridescence = maskState.iridescence;
			material.iridescenceIOR = maskState.iridescenceIOR;
			material.iridescenceThicknessRange = [
				maskState.iridescenceThicknessMin,
				maskState.iridescenceThicknessMax
			];
			material.wireframe = maskState.wireframe;
			material.flatShading = maskState.flatShading;
			material.side = MATERIAL_SIDE[maskState.side] ?? THREE.DoubleSide;
			material.transparent = maskState.opacity < 1 || maskState.transmission > 0;
			material.needsUpdate = true;
		}
	});

	useTask(() => {
		if (!landmarkRef.current?.faceLandmarks?.length || !videoElement || !geometry || !mesh) {
			if (mesh) mesh.visible = false;
			return;
		}

		mesh.visible = true;

		const cam = $camera as THREE.PerspectiveCamera;
		const distance = cam.position.z;
		const vFov = (cam.fov * Math.PI) / 180;

		const height = 2 * Math.tan(vFov / 2) * distance;
		const aspect = $size.width / $size.height;
		const width = height * aspect;

		let scaleX = width;
		let scaleY = height;

		if (videoElement.videoWidth && videoElement.videoHeight) {
			const videoAspect = videoElement.videoWidth / videoElement.videoHeight;
			const screenAspect = aspect;

			if (screenAspect > videoAspect) {
				scaleY = width / videoAspect;
			} else {
				scaleX = height * videoAspect;
			}
		}

		const face = landmarkRef.current.faceLandmarks[0];
		const posAttribute = geometry.attributes.position;

		const maskScale = maskState.scale;
		const depthScale = maskState.depthScale;

		for (let i = 0; i < vertexCount; i++) {
			const lm = face[i];
			if (!lm) continue;

			const x = (0.5 - lm.x) * scaleX * maskScale + maskState.offsetX;
			const y = -(lm.y - 0.5) * scaleY * maskScale + maskState.offsetY;
			const z = -lm.z * scaleX * maskScale * depthScale + maskState.offsetZ;

			posAttribute.setXYZ(i, x, y, z);
		}

		posAttribute.needsUpdate = true;
		geometry.computeVertexNormals();
	});
</script>

<T.Group>
	<T.Mesh bind:ref={mesh}>
		<T.BufferGeometry bind:ref={geometry}>
			<T.BufferAttribute
				args={[positions, 3]}
				attach="attributes.position"
				count={vertexCount}
				itemSize={3}
				usage={THREE.DynamicDrawUsage}
			/>
			<T.BufferAttribute args={[uvs, 2]} attach="attributes.uv" count={vertexCount} itemSize={2} />
			<T.BufferAttribute args={[indices, 1]} attach="index" count={indices.length} itemSize={1} />
		</T.BufferGeometry>

		<T.MeshPhysicalMaterial
			bind:ref={material}
			color={maskState.color}
			opacity={maskState.opacity}
			roughness={maskState.roughness}
			metalness={maskState.metalness}
			clearcoat={maskState.clearcoat}
			clearcoatRoughness={maskState.clearcoatRoughness}
			iridescence={maskState.iridescence}
			iridescenceIOR={maskState.iridescenceIOR}
			transparent={true}
			side={THREE.DoubleSide}
		/>
	</T.Mesh>
</T.Group>
