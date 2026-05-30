import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { FaceLandmarkRef } from '$lib/types';

const VISION_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm';

export class FaceLandmarkerService {
	modelLoaded = $state(false);
	error = $state<string | null>(null);
	landmarksRef: FaceLandmarkRef = { current: null };

	private faceLandmarker: FaceLandmarker | null = null;
	private requestRef: number = 0;

	async init() {
		try {
			const filesetResolver = await FilesetResolver.forVisionTasks(VISION_BASE_URL);
			this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
				baseOptions: {
					modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
					delegate: 'GPU'
				},
				outputFaceBlendshapes: true,
				runningMode: 'VIDEO',
				numFaces: 1
			});
			this.modelLoaded = true;
		} catch (err) {
			console.error(err);
			this.error = 'Failed to load Face Tracking model.';
		}
	}

	startPrediction(videoElement: HTMLVideoElement) {
		const predict = () => {
			if (this.faceLandmarker && videoElement && videoElement.readyState >= 2) {
				const results = this.faceLandmarker.detectForVideo(videoElement, performance.now());
				this.landmarksRef.current = results;
			}
			this.requestRef = requestAnimationFrame(predict);
		};
		predict();
	}

	stopPrediction() {
		if (this.requestRef) cancelAnimationFrame(this.requestRef);
	}

	destroy() {
		this.stopPrediction();
		this.faceLandmarker?.close();
	}
}
