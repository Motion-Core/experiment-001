<div align="center">
  <h1>Experiment 001</h1>
</div>

<div align="center">

[![Svelte](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-10.33.3-yellow.svg)](https://pnpm.io)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-black.svg)](https://threejs.org)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Face%20Landmarker-green.svg)](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker)

</div>

**Experiment 001** is a minimal browser-based face tracking experiment built with Svelte 5, MediaPipe, Threlte, Three.js, and Tweakpane.

It captures webcam input, tracks facial landmarks in real time, and renders a configurable metallic face mesh over the detected face.

---

## Features

- **Realtime face tracking** with MediaPipe Face Landmarker.
- **Procedural mask rendering** with `MeshPhysicalMaterial`.
- **Minimal control surface** powered by Tweakpane.
- **Svelte 5 native** application structure.
- **pnpm-based workflow**.

---

## Usage

### Install

```bash
pnpm install
```

### Develop

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Check

```bash
pnpm run check
```

### Build

```bash
pnpm run build
```

### Cloudflare Workers

Run a local Worker preview:

```bash
pnpm run cf:dev
```

Check the deploy bundle without publishing:

```bash
pnpm run deploy:dry-run
```

Deploy to Cloudflare Workers:

```bash
pnpm run deploy
```

---

## License

This project is licensed under the MIT License.

See the `LICENSE` file for details.
