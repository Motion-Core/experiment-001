import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export interface FaceARState {
	isCameraReady: boolean;
	isModelLoaded: boolean;
	error: string | null;
}

export type FaceLandmarkRef = { current: FaceLandmarkerResult | null };
