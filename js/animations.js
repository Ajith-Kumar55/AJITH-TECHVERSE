/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * Animation Engine & Micro-Interactions (animations.js)
 * Neural Canvas Simulator, Counter Tickers, and Scroll Observers
 */

(function () {
  'use strict';

  // 1. AI & ML Specialization: Interactive Neural Canvas Simulator
  function initNeuralCanvas() {
    const canvas = document.getElementById('ai-neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener('resize', function () {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const nodes = [];
    const nodeCount = 28;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: i % 2 === 0 ? '#FF5500' : '#B8FF00'
      });
    }

    function renderNeural() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 85, 0, ${0.45 * (1 - dist / 65)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach(function (node) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      requestAnimationFrame(renderNeural);
    }

    renderNeural();
  }

  // 2. Data Analytics Sparkline Bars Random Flutter
  function initSparklineFlutter() {
    const bars = document.querySelectorAll('.spark-bar');
    if (!bars.length) return;

    setInterval(function () {
      bars.forEach(function (bar) {
        if (Math.random() > 0.6) {
          const newHeight = Math.floor(Math.random() * 55) + 25;
          bar.style.height = `${newHeight}px`;
        }
      });
    }, 1800);
  }

  // 3. Counter Tickers
  function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isFloat = el.getAttribute('data-float') === 'true';
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1500;
          const start = performance.now();

          function updateCount(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;

            el.textContent = prefix + (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = prefix + (isFloat ? target.toFixed(2) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (c) {
      observer.observe(c);
    });
  }

  // 4. Scroll Reveal via IntersectionObserver
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNeuralCanvas();
    initSparklineFlutter();
    initCounters();
    initScrollReveal();
  });
})();
