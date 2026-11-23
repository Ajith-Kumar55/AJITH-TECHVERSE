/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * Three.js 3D Hero Centerpiece (three-scene.js)
 * Interactive Intelligence Core with 4 Discipline Satellite Nodes & Focus Modes
 */

(function () {
  'use strict';

  const container = document.getElementById('three-hero-container');
  const canvas = document.getElementById('three-hero-canvas');

  if (!container || !canvas || typeof THREE === 'undefined') {
    return;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scene, camera, renderer;
  let mainCore, outerCage, ringOne, ringTwo, particleSystem;
  let satelliteNodes = [];
  let connectorLines = [];
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let isVisible = true;
  let activeSector = -1; // -1 = ambient, 0..3 = focused discipline
  let animationFrameId;

  // Sector coordinates for the 4 disciplines around the core
  const SECTOR_CONFIGS = [
    { name: 'AI & ML', rotX: 0.35, rotY: -0.45, color: 0xff5500, pos: [-1.9, 1.3, 0.5] },
    { name: 'Data Analytics', rotX: 0.35, rotY: 0.45, color: 0x00b4d8, pos: [1.9, 1.3, -0.5] },
    { name: 'Cybersecurity', rotX: -0.35, rotY: -0.45, color: 0xb8ff00, pos: [-1.9, -1.3, -0.5] },
    { name: 'Full Stack', rotX: -0.35, rotY: 0.45, color: 0x8b5cf6, pos: [1.9, -1.3, 0.5] }
  ];

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 500;

  function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.4;

    // 3. Renderer Setup with WebGL Support Check
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to CSS HUD.');
      container.classList.add('webgl-unavailable');
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const orangeRimLight = new THREE.DirectionalLight(0xff5500, 2.4);
    orangeRimLight.position.set(-6, -4, -3);
    scene.add(orangeRimLight);

    const limeAccentLight = new THREE.PointLight(0xb8ff00, 2.0, 16);
    limeAccentLight.position.set(0, 4, 2);
    scene.add(limeAccentLight);

    // 5. Geometry: Metallic Torus Knot Core (The Intelligence Processor)
    const coreGeometry = new THREE.TorusKnotGeometry(1.25, 0.36, 110, 20, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f232c,
      metalness: 0.88,
      roughness: 0.2,
      wireframe: false
    });
    mainCore = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(mainCore);

    // 6. Geometry: Geometric Outer Shell (Defense & Architecture Shield)
    const cageGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    outerCage = new THREE.Mesh(cageGeometry, cageMaterial);
    scene.add(outerCage);

    // 7. Geometry: Gyroscope Data Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xb8ff00,
      transparent: true,
      opacity: 0.55
    });
    ringOne = new THREE.Mesh(ringGeo1, ringMat1);
    ringOne.rotation.x = Math.PI / 3;
    scene.add(ringOne);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35
    });
    ringTwo = new THREE.Mesh(ringGeo2, ringMat2);
    ringTwo.rotation.y = Math.PI / 4;
    scene.add(ringTwo);

    // 8. Geometry: 4 Satellite Discipline Nodes
    SECTOR_CONFIGS.forEach(function (cfg, idx) {
      // Sphere Node
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.85
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      scene.add(nodeMesh);
      satelliteNodes.push(nodeMesh);

      // Connecting Beam to Core
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(cfg.pos[0] * 0.9, cfg.pos[1] * 0.9, cfg.pos[2] * 0.9));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineDashedMaterial({
        color: cfg.color,
        dashSize: 0.1,
        gapSize: 0.05,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);
      connectorLines.push(line);
    });

    // 9. Geometry: Ambient Neural Node Particle Cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOrange = new THREE.Color(0xff5500);
    const colorLime = new THREE.Color(0xb8ff00);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorOrange : i % 3 === 1 ? colorLime : colorWhite;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 10. Event Listeners
    setupEvents();

    // 11. Start Animation Loop
    animate();
  }

  function setupEvents() {
    window.addEventListener('resize', onWindowResize, false);

    // Parallax on Pointer Movement
    container.addEventListener('pointermove', function (e) {
      if (activeSector !== -1) return; // Sector focus takes precedence
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (x / rect.width) * 1.1;
      targetY = -(y / rect.height) * 1.1;
    });

    container.addEventListener('pointerleave', function () {
      if (activeSector === -1) {
        targetX = 0;
        targetY = 0;
      }
    });

    // Touch Support for Mobile
    container.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0 && activeSector === -1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;

        targetX = (x / rect.width) * 0.9;
        targetY = -(y / rect.height) * 0.9;
      }
    }, { passive: true });

    // IntersectionObserver to pause rendering when offscreen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(container);
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  // Focus on a specific discipline sector (0 = AI/ML, 1 = Analytics, 2 = Cyber, 3 = Full Stack)
  window.focusCoreSector = function (sectorIndex) {
    if (sectorIndex >= 0 && sectorIndex < SECTOR_CONFIGS.length) {
      activeSector = sectorIndex;
      const cfg = SECTOR_CONFIGS[sectorIndex];
      targetX = cfg.rotY * 1.8;
      targetY = -cfg.rotX * 1.8;

      // Pulse and scale targeted satellite node
      satelliteNodes.forEach(function (node, idx) {
        if (idx === sectorIndex) {
          node.scale.set(1.9, 1.9, 1.9);
          node.material.opacity = 1.0;
        } else {
          node.scale.set(0.7, 0.7, 0.7);
          node.material.opacity = 0.3;
        }
      });

      // Highlight connector line
      connectorLines.forEach(function (line, idx) {
        line.material.opacity = idx === sectorIndex ? 0.9 : 0.15;
      });
    }
  };

  // Reset core back to ambient state
  window.resetCoreSector = function () {
    activeSector = -1;
    targetX = 0;
    targetY = 0;

    satelliteNodes.forEach(function (node) {
      node.scale.set(1.0, 1.0, 1.0);
      node.material.opacity = 0.85;
    });

    connectorLines.forEach(function (line) {
      line.material.opacity = 0.35;
    });
  };

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    if (!prefersReducedMotion) {
      // Smooth Damping Towards Target Position
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Ambient Core Rotation (slows down when focused on a sector)
      const rotSpeed = activeSector === -1 ? 1.0 : 0.25;
      mainCore.rotation.x += 0.006 * rotSpeed;
      mainCore.rotation.y += 0.009 * rotSpeed;

      // Counter-rotating Shell
      outerCage.rotation.x -= 0.0025 * rotSpeed;
      outerCage.rotation.y -= 0.004 * rotSpeed;

      // Orbiting Gyro Rings
      ringOne.rotation.z += 0.005 * rotSpeed;
      ringTwo.rotation.x += 0.004 * rotSpeed;

      // Slowly Drift Particle Constellation
      particleSystem.rotation.y += 0.0012 * rotSpeed;

      // Apply Parallax / Focus Tilt to Entire Scene
      scene.rotation.y = mouseX * 0.55;
      scene.rotation.x = -mouseY * 0.55;
    } else {
      // Static display for reduced motion
      mainCore.rotation.y = 0.5;
      mainCore.rotation.x = 0.3;
    }

    renderer.render(scene, camera);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
