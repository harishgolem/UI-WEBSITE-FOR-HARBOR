# ⚓ Harbour — Cinematic 3D Financial Security Experience

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r162-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-Custom%20GLSL-990000?style=for-the-badge&logo=webgl&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<p align="center">
  <b>An interactive, scroll-driven 3D web experience showcasing autonomous real-time financial protection and escrow security.</b>
</p>

[Explore Experience](#-quick-start) • [Features](#-features) • [Cinematic Stages](#-cinematic-stages) • [Tech Stack](#-tech-stack) • [Architecture](#-project-structure)

</div>

---

## 🌟 Overview

**Harbour** is a next-generation interactive 3D web experience that visualizes autonomous fraud prevention and real-time escrow protection. Built with **Three.js**, **React**, and custom **GLSL shaders**, it transports users through a multi-stage cinematic camera journey illustrating how modern financial transactions are analyzed, verified, and shielded from digital threats.

---

## ✨ Features

- 🌌 **Scroll-Driven 3D Timeline**: Multi-axis camera flight with cubic easing across 10 distinct thematic scenes.
- ⚡ **Procedural GLSL Shaders**:
  - `liquidGlass.js`: Dynamic refraction and caustics simulating hardened cryptographic glass.
  - `particleStream.js`: High-velocity data packet streams and digital vortex trails.
  - `scannerLaser.js`: Volumetric laser grid and acoustic perimeter visualization.
- 🔊 **Procedural Web Audio Engine**: Custom synthesized sound effects (sub-bass hum, laser sweeps, transaction pulses, particle resonance) generated in real-time via the Web Audio API with spatial panning.
- 🎯 **Tactical HUD & Telemetry**:
  - Live cursor tracking with normalized device coordinates (`X:+0.000 Y:+0.000`).
  - Speedometer and transaction window telemetry.
  - Interactive dot navigation for jumping between chapters.
  - Sound muting/unmuting toggle with auto-activation on user interaction.
- 🛡️ **Interactive Micro-Interactions**:
  - Click-triggered shockwave ripples across the 3D particle universe.
  - Responsive mouse parallax and depth-of-field focus shifts.
  - Interactive "Enter Harbour" vault modal with fraud metrics and confetti celebration.

---

## 🎬 Cinematic Stages

Harbour guides users through 10 interactive narrative chapters:

| Stage | Chapter | Visual Experience | Key Telemetry / Concept |
|:---:|:---|:---|:---|
| **0** | **Void / Singularity Origin** | Microscopic glowing nucleus suspended in darkness | Genesis of a secure financial transfer |
| **1** | **Digital Storm** | High-speed dive through a hyper-velocity particle tunnel | 631.5 GBP/s burst velocity across 34 network hops |
| **2** | **Transaction Core** | Orbit around an authenticating crystal cryptographic ledger | £12,400 authenticated payment verification |
| **3** | **Risk Scanner** | Low-angle sweep with emerald scanning lasers | Deep packet anomaly and heuristic inspection |
| **4** | **Zero-G Pause** | Dead-center macro freeze of financial momentum | Real-time threat intervention & interception |
| **5** | **Harbour Architecture** | Grand pull-back reveal of the protective fortress grid | Autonomous shielding topology |
| **6** | **Voice Waveform** | Elevated perspective of biometric acoustic frequencies | Biometric identity confirmation |
| **7** | **Protection Barrier** | Symmetrical energy wall neutralizing attack vectors | 100% encrypted vault containment |
| **8** | **Trusted Nodes** | Stereoscopic view of verified banking network anchors | Multi-signature consensus & clearing |
| **9** | **Final Convergence** | Monumental wide shot of complete transaction settlement | Zero fraud loss guaranteed |

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **3D Graphics & Rendering**: [Three.js (r162)](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Math & Shaders**: Custom GLSL Vertex/Fragment Shaders, [Simplex Noise](https://github.com/jwagner/simplex-noise.js)
- **Animations & Easing**: [GSAP (GreenSock)](https://greensock.com/), Custom cubic camera interpolation
- **Smooth Scrolling**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Audio**: Native Web Audio API (Synthesized procedural soundscapes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harishgolem/UI-WEBSITE-FOR-HARBOR.git
   cd UI-WEBSITE-FOR-HARBOR
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```plaintext
UI-WEBSITE-FOR-HARBOR/
├── public/                     # Static assets
├── src/
│   ├── 3d/                     # React Three Fiber scene components
│   │   ├── Experience.jsx
│   │   ├── SceneFinalConvergence.jsx
│   │   ├── SceneHarbourStructure.jsx
│   │   ├── ScenePauseMoment.jsx
│   │   ├── ScenePayment.jsx
│   │   ├── SceneProtectionBarrier.jsx
│   │   ├── SceneRiskScanner.jsx
│   │   ├── SceneStorm.jsx
│   │   ├── SceneTrustedContact.jsx
│   │   ├── SceneVoiceWaveform.jsx
│   │   └── SingularitySeed.jsx
│   ├── audio/
│   │   └── SoundEngine.js      # Synthesized Web Audio API sound generator
│   ├── components/
│   │   ├── CanvasContainer.jsx # WebGL canvas mounting wrapper
│   │   ├── ComponentsShowcase.jsx
│   │   ├── LoadingScreen.jsx   # Initialization preloader
│   │   ├── MainAppPreview.jsx  # Secured vault entrance
│   │   ├── NavigationOverlay.jsx# Persistent HUD, stage dots, audio controls
│   │   └── SceneTypography.jsx # Cinematic narrative text overlays
│   ├── shaders/                # Custom GLSL shaders
│   │   ├── liquidGlass.js
│   │   ├── particleStream.js
│   │   └── scannerLaser.js
│   ├── three/                  # Three.js imperative rendering engine
│   │   ├── CameraTimeline.js   # Keyframes and scroll-driven camera motion
│   │   ├── HarbourEngine.js    # Render loop, viewport, and mouse management
│   │   ├── ParticleWorld.js    # Particle systems and physics
│   │   └── WorldObjects.js     # Procedural 3D mesh architectures
│   ├── App.jsx                 # Main application controller
│   ├── index.css               # Global styling, cyberpunk HUD, and typography
│   └── main.jsx                # Application root
├── index.html                  # HTML template with Google Fonts
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🎮 Controls & Interactions

- **Scroll Down / Up**: Fly through the 10 cinematic stages of transaction validation.
- **Mouse Movement**: Direct real-time camera parallax and HUD coordinate tracking.
- **Left Click**: Trigger a radial sonic shockwave through the 3D particle field.
- **Chapter Dots (Right Sidebar)**: Click any chapter dot to jump directly to that phase.
- **Audio Toggle (Top Right)**: Enable / mute synthesized procedural audio.
- **"ENTER HARBOUR"**: Enter the protected vault interface at the final stage.
## 🤖 AI-Assisted Development

This project was developed with the assistance of AI-powered development
tools, including Google Antigravity.

AI assistance was used for:
- Frontend development and component implementation
- UI/UX design exploration
- 3D scene development and refinement
- Debugging and code improvements
- Feature development and iteration

The project concept, requirements, design direction, and final development
decisions were defined and reviewed by the developer.

AI tools were used as development assistants, while the resulting
implementation was reviewed and tested for functionality.
## ⚠️ Project Disclaimer

HARBOR is currently a frontend-focused demonstration of a financial
security platform.

The transaction security visualizations and protection metrics are
conceptual and intended for demonstration purposes.

The project does not currently provide real financial protection,
fraud detection, or payment processing.
---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Crafted with ❤️ by <a href="https://github.com/harishgolem">Harish</a>
</div>
