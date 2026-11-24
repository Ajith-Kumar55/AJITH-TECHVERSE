/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * Core Engine & Interactive UI Controller (main.js)
 * Integrates Vanilla JS & jQuery for Full-Stack Interactivity
 */

(function ($) {
  'use strict';

  if (!$) {
    console.error('[NEXUS 2040 Error] jQuery is not loaded. Please verify the jQuery 3.7.1 script tag is included before main.js.');
    return;
  }

  // 1. Case Study Data Store for All 5 Projects
  const CASE_STUDIES = {
    netguard: {
      title: 'NetGuard AI // ML Network Intrusion Detection System',
      category: 'Cybersecurity & Machine Learning',
      accuracy: '99.68% Validation Accuracy',
      stack: ['Python', 'Scikit-learn', 'Gradient Boosting', 'FastAPI', 'Docker', 'Async Preprocessing'],
      problem: 'High-throughput enterprise networks are inundated by polymorphic zero-day attacks, distributed denial-of-service (DDoS) floods, and stealthy lateral reconnaissance. Conventional rule-based intrusion systems suffer from prohibitive false-positive rates and cannot adapt to evolving attack vectors.',
      solution: 'Developed an end-to-end Machine Learning pipeline utilizing an ensemble Gradient Boosting classifier. The system extracts flow-duration, TCP/UDP flag distributions, and packet octet ratios, processing live telemetry via FastAPI async workers with sub-5 millisecond prediction latency.',
      features: [
        'Real-time network traffic classification and anomaly tagging.',
        'High-dimensional feature selection and robust data preprocessing.',
        'Ensemble Gradient Boosting core with 99.68% verified test accuracy.',
        'Interactive security monitoring dashboard with immediate threat classification.',
        'Containerized deployment using Docker for zero-downtime microservice scaling.'
      ],
      diagram: 'assets/images/project-netguard.svg',
      githubUrl: 'https://github.com/Ajith-Kumar55',
      demoUrl: '#'
    },
    stayiq: {
      title: 'StayIQ // Airbnb Booking & Yield Intelligence Platform',
      category: 'Data Analytics & Full Stack',
      accuracy: 'High Predictive Correlation (R² = 0.89)',
      stack: ['Python', 'React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'Scikit-learn'],
      problem: 'Short-term rental operators frequently misprice properties during seasonal inflection points and suffer revenue loss from sudden booking cancellations without predictive forewarning.',
      solution: 'Engineered an intelligent hospitality intelligence suite combining regression algorithms for dynamic nightly rate optimization, classification models for cancellation risk scoring, and time-series forecasting for 90-day demand curves.',
      features: [
        'Dynamic market price recommendations based on real-time competitor density and seasonality.',
        'Propensity scoring to classify high-risk booking cancellations before check-in.',
        'Seasonal demand forecasting across neighborhood metropolitan sub-markets.',
        'Interactive React + TypeScript visual dashboard with real-time SQLAlchemy analytics.',
        'FastAPI asynchronous REST endpoints for lightning-fast frontend queries.'
      ],
      diagram: 'assets/images/project-stayiq.svg',
      githubUrl: 'https://github.com/Ajith-Kumar55',
      demoUrl: '#'
    },
    fraudshield: {
      title: 'FraudShield AI // Fraud Intelligence & Risk Engine',
      category: 'AI & Data Analytics',
      accuracy: 'Sub-10ms Anomaly Classification',
      stack: ['Python', 'Flask', 'React', 'Scikit-learn', 'Isolation Forests'],
      problem: 'Digital financial transactions require instantaneous fraud evaluation without creating friction for legitimate customers or exposing systems to card-not-present fraud rings.',
      solution: 'Constructed an adaptive anomaly detection architecture using Isolation Forests and behavioral deviation heuristics. The engine computes geo-velocity mismatch, transactional frequency spikes, and device fingerprint alterations in real time.',
      features: [
        'Continuous ingestion and vectorization of incoming transaction payloads.',
        'Multi-factor risk assessment scoring with configurable threshold automation.',
        'Visual threat radar displaying multi-dimensional risk parameters.',
        'Flask RESTful API microservice with comprehensive audit logs.',
        'React frontend interface featuring live flagged ledgers and instant resolution triggers.'
      ],
      diagram: 'assets/images/project-fraud.svg',
      githubUrl: 'https://github.com/Ajith-Kumar55',
      demoUrl: '#'
    },
    civicai: {
      title: 'Civic AI // Smart City Municipal Issue Detector',
      category: 'Computer Vision & AI',
      accuracy: '94.2% mAP Object Detection',
      stack: ['Python', 'TensorFlow', 'Roboflow', 'YOLOv8', 'Flask', 'React'],
      problem: 'Municipal city councils struggle with delayed remediation of critical urban infrastructure failures such as dangerous potholes, hazardous overflowing waste, and ruptured water mains.',
      solution: 'Created an intelligent computer vision pipeline trained on annotated urban defect imagery via Roboflow and TensorFlow. Street camera and citizen mobile uploads are analyzed to automatically detect, classify, and dispatch geo-tagged civic work tickets.',
      features: [
        'Multi-class computer vision model detecting potholes, garbage heaps, and water leaks.',
        'Custom Roboflow training workflow with data augmentation and model optimization.',
        'Automated municipal ticket creation with GPS coordinate mapping and severity tagging.',
        'Responsive citizen reporting portal connected to a Flask dispatch API.',
        'Operations dashboard for municipal repair crews to monitor SLA progress.'
      ],
      diagram: 'assets/images/project-civic.svg',
      githubUrl: 'https://github.com/Ajith-Kumar55',
      demoUrl: '#'
    },
    harvestlink: {
      title: 'HarvestLink // AI-Powered Agriculture Marketplace',
      category: 'Full Stack & Mobile Development',
      accuracy: 'Cross-Platform Production Ready',
      stack: ['Flutter', 'Dart', 'Provider', 'REST APIs', 'Hive Local Storage'],
      problem: 'Smallholder agricultural producers lose significant profits to predatory intermediaries, lack transparent price discovery, and encounter language barriers when seeking agronomy guidance.',
      solution: 'Architected a multilingual, cross-platform mobile application utilizing Flutter and Dart. The platform enables direct farmer-to-consumer commerce, role-based workflows for farmers, buyers, and logistics hubs, paired with voice-guided AI crop advisories in Kannada and English.',
      features: [
        'Direct farmer-to-buyer auction and marketplace eliminating middleman markups.',
        'Role-based authentication supporting Farmer, Wholesale Buyer, and Logistics Coordinator.',
        'AI crop advisory engine forecasting rain and localized pest alerts.',
        'Multilingual interface with native Kannada and English speech support.',
        'Offline-first architecture with Provider state management and Hive caching.'
      ],
      diagram: 'assets/images/project-harvest.svg',
      githubUrl: 'https://github.com/Ajith-Kumar55',
      demoUrl: '#'
    }
  };

  // 2. DOM Ready Orchestrations
  $(document).ready(function () {
    initThemeManager();
    initRotatingRoles();
    initNavbarInteractions();
    initIntelligenceCore();
    initProjectFiltering();
    initCaseStudyModal();
    initContactForm();
    initPrivacyShield();
    initBackToTop();
  });

  // 3. Theme Management (Light / Dark Mode)
  function initThemeManager() {
    const savedTheme = localStorage.getItem('nexus_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    $('.theme-toggle-btn').on('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexus_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    const iconSpan = $('.theme-icon');
    if (!iconSpan.length) return;
    if (theme === 'dark') {
      iconSpan.text('☀️');
      $('.theme-toggle-btn').attr('title', 'Switch to Editorial Light Mode');
    } else {
      iconSpan.text('🌙');
      $('.theme-toggle-btn').attr('title', 'Switch to Deep Cyber Dark Mode');
    }
  }

  // 4. Animated Rotating Roles in Hero (Smooth fade transition, no partial words or layout shifts)
  function initRotatingRoles() {
    const roles = [
      'Artificial Intelligence & Machine Learning',
      'Data Analytics & Data Science',
      'Cybersecurity & Network Security',
      'Full Stack Development'
    ];

    const targetEl = document.getElementById('role-rotating-text');
    if (!targetEl) return;

    let roleIndex = 0;

    setInterval(function () {
      $(targetEl).addClass('role-fade-out');
      setTimeout(function () {
        roleIndex = (roleIndex + 1) % roles.length;
        targetEl.textContent = roles[roleIndex];
        $(targetEl).removeClass('role-fade-out');
      }, 300);
    }, 3000);
  }

  // 5. Intelligence Core Discipline Interactions
  function initIntelligenceCore() {
    const $discCards = $('.core-discipline-card');
    const $statusTag = $('#core-status-tag');
    const $statusText = $('#core-status-text');

    if (!$discCards.length) return;

    const sectorExplanations = [
      {
        tag: 'DISCIPLINE 01 // AI & ML',
        text: 'Artificial Intelligence: Deep neural systems, gradient boosting ensemble & computer vision pipelines.'
      },
      {
        tag: 'DISCIPLINE 02 // ANALYTICS',
        text: 'Data Analytics: Predictive yield modeling, dynamic regression pricing & seasonal demand curves.'
      },
      {
        tag: 'DISCIPLINE 03 // DEFENSE',
        text: 'Cybersecurity: Real-time packet NIDS defense (99.68% accuracy), anomaly radar & zero-day mitigation.'
      },
      {
        tag: 'DISCIPLINE 04 // FULL STACK',
        text: 'Full Stack Development: Production REST APIs, microservices, Flutter mobile & reactive client UIs.'
      }
    ];

    function activateSector(sector) {
      $discCards.removeClass('active');
      $discCards.filter(`[data-sector="${sector}"]`).addClass('active');

      if (sectorExplanations[sector]) {
        if ($statusTag.length) $statusTag.text(sectorExplanations[sector].tag);
        if ($statusText.length) $statusText.text(sectorExplanations[sector].text);
      }

      if (typeof window.focusCoreSector === 'function') {
        window.focusCoreSector(sector);
      }
    }

    function resetSector() {
      $discCards.removeClass('active');
      if ($statusTag.length) $statusTag.text('CORE STATUS');
      if ($statusText.length) $statusText.text('Hover or click any discipline below to focus 3D core & view architecture');

      if (typeof window.resetCoreSector === 'function') {
        window.resetCoreSector();
      }
    }

    function navigateToSpec(sector) {
      const targetHash = '#specializations';
      if ($(targetHash).length) {
        const navHeight = $('.site-nav').outerHeight() || 64;
        $('html, body').animate({
          scrollTop: $(targetHash).offset().top - navHeight - 16
        }, 500);

        // Highlight matching specialization card
        const specCards = $('.spec-card');
        if (specCards.eq(sector).length) {
          specCards.removeClass('highlight-pulse');
          specCards.eq(sector).addClass('highlight-pulse');
          setTimeout(function () {
            specCards.eq(sector).removeClass('highlight-pulse');
          }, 2200);
        }
      }
    }

    $discCards.on('mouseenter focus', function () {
      const sector = parseInt($(this).attr('data-sector'), 10);
      activateSector(sector);
    });

    $discCards.on('mouseleave blur', function () {
      resetSector();
    });

    $discCards.on('click', function () {
      const sector = parseInt($(this).attr('data-sector'), 10);
      activateSector(sector);
      navigateToSpec(sector);
    });

    // Keyboard accessibility: Enter or Space triggers navigation
    $discCards.on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sector = parseInt($(this).attr('data-sector'), 10);
        activateSector(sector);
        navigateToSpec(sector);
      }
    });
  }

  // 6. Navigation Bar & Mobile Menu (jQuery)
  function initNavbarInteractions() {
    const $nav = $('.site-nav');
    const $mobileToggle = $('.mobile-nav-toggle');
    const $navLinks = $('.nav-links');

    // Sticky Scroll Elevation
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 30) {
        $nav.addClass('scrolled');
      } else {
        $nav.removeClass('scrolled');
      }
      highlightActiveNav();
    });

    // Mobile Hamburger Toggle
    $mobileToggle.on('click', function () {
      $navLinks.toggleClass('mobile-open');
      const isOpen = $navLinks.hasClass('mobile-open');
      $(this).attr('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    $navLinks.find('a').on('click', function () {
      if ($(window).width() <= 1100) {
        $navLinks.removeClass('mobile-open');
        $mobileToggle.attr('aria-expanded', 'false');
      }
    });

    // Smooth Scrolling for Hash Links with Offset
    $('a[href^="#"]').on('click', function (e) {
      const targetHash = this.hash;
      if (targetHash && $(targetHash).length) {
        e.preventDefault();
        const navHeight = $('.site-nav').outerHeight() || 74;
        $('html, body').animate({
          scrollTop: $(targetHash).offset().top - navHeight - 16
        }, 500);
      }
    });
  }

  function highlightActiveNav() {
    const scrollPos = $(window).scrollTop() + 150;
    $('section[id]').each(function () {
      const top = $(this).offset().top;
      const height = $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos < top + height) {
        $('.nav-links a').removeClass('active');
        $(`.nav-links a[href="#${id}"]`).addClass('active');
      }
    });
  }

  // 6. Project Category Filtering (jQuery)
  function initProjectFiltering() {
    const $filterBtns = $('.filter-btn');
    const $projectCards = $('.project-card');

    $filterBtns.on('click', function () {
      $filterBtns.removeClass('active');
      $(this).addClass('active');

      const selected = $(this).attr('data-filter');

      if (selected === 'all') {
        $projectCards.fadeIn(300);
      } else {
        $projectCards.each(function () {
          const category = $(this).attr('data-category');
          if (category && category.includes(selected)) {
            $(this).fadeIn(300);
          } else {
            $(this).fadeOut(200);
          }
        });
      }
    });
  }

  // 7. Case Study Deep-Dive Modal System
  function initCaseStudyModal() {
    const $modal = $('#case-study-modal');
    if (!$modal.length) return;

    // Open Case Study
    $(document).on('click', '.btn-case-study', function (e) {
      e.preventDefault();
      const studyKey = $(this).attr('data-case-key');
      const data = CASE_STUDIES[studyKey];

      if (!data) return;

      // Populate Modal Fields
      $('#modal-project-title').text(data.title);
      $('#modal-project-category').text(data.category);
      $('#modal-project-accuracy').text(data.accuracy);
      $('#modal-project-problem').text(data.problem);
      $('#modal-project-solution').text(data.solution);

      // Stack Tags
      const $stackBox = $('#modal-project-stack').empty();
      data.stack.forEach(function (tech) {
        $stackBox.append(`<span class="tag-pill">${tech}</span>`);
      });

      // Features List
      const $featuresList = $('#modal-project-features').empty();
      data.features.forEach(function (feat) {
        $featuresList.append(`<li>${feat}</li>`);
      });

      // Architecture Image
      if (data.diagram) {
        $('#modal-project-diagram').attr('src', data.diagram).show();
      } else {
        $('#modal-project-diagram').hide();
      }

      // External Links
      $('#modal-github-link').attr('href', data.githubUrl);

      $modal.addClass('active');
      $('body').css('overflow', 'hidden');
    });

    // Close Modal Events
    $('#modal-close-btn, .modal-overlay').on('click', function (e) {
      if (e.target === this || $(this).is('#modal-close-btn')) {
        $modal.removeClass('active');
        $('body').css('overflow', '');
      }
    });

    // Close on Escape Key
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $modal.hasClass('active')) {
        $modal.removeClass('active');
        $('body').css('overflow', '');
      }
    });
  }

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    serviceId: 'service_3odtnj5',
    templateId: 'template_goeixeb',
    publicKey: 'WkjSDKWgqbrnQgOc2',
    recipientEmail: 'mrajithsagar123@gmail.com'
  };

  // Expose configuration object globally so credentials can also be set or verified via window.EMAILJS_CONFIG
  if (typeof window !== 'undefined') {
    window.EMAILJS_CONFIG = window.EMAILJS_CONFIG || EMAILJS_CONFIG;
  }

  // 8. Contact Form Validation with Direct EmailJS Integration
  function initContactForm() {
    const $form = $('#contact-dispatch-form');
    if (!$form.length) return;

    // Initialize EmailJS with Public Key
    const cfg = (typeof window !== 'undefined' && window.EMAILJS_CONFIG) ? window.EMAILJS_CONFIG : EMAILJS_CONFIG;
    if (typeof emailjs !== 'undefined') {
      try {
        emailjs.init({ publicKey: cfg.publicKey });
      } catch (err) {
        console.warn('[EmailJS] Initialization notice:', err);
      }
    }

    $form.on('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const $name = $('#contact-name');
      const $email = $('#contact-email');
      const $subject = $('#contact-subject');
      const $message = $('#contact-message');
      const $alert = $('#contact-feedback-alert');

      // Clear previous error states and alerts
      $form.find('.form-control').removeClass('error');
      $form.find('.form-error-hint').hide();
      $alert.hide().removeClass('success error').empty();

      const nameVal = $name.val().trim();
      const emailVal = $email.val().trim();
      const subjectVal = $subject.val().trim();
      const messageVal = $message.val().trim();

      // Validate Name
      if (!nameVal || nameVal.length < 2) {
        $name.addClass('error');
        $name.siblings('.form-error-hint').text('Please enter a valid name (min 2 characters).').show();
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        $email.addClass('error');
        $email.siblings('.form-error-hint').text('Please enter a valid email address.').show();
        isValid = false;
      }

      // Validate Subject
      if (!subjectVal || subjectVal.length < 3) {
        $subject.addClass('error');
        $subject.siblings('.form-error-hint').text('Please specify a transmission subject.').show();
        isValid = false;
      }

      // Validate Message
      if (!messageVal || messageVal.length < 10) {
        $message.addClass('error');
        $message.siblings('.form-error-hint').text('Message must be at least 10 characters.').show();
        isValid = false;
      }

      if (!isValid) return;

      const $submitBtn = $form.find('button[type="submit"]');
      const originalBtnText = $submitBtn.html();
      const activeConfig = (typeof window !== 'undefined' && window.EMAILJS_CONFIG) ? window.EMAILJS_CONFIG : EMAILJS_CONFIG;

      if (typeof emailjs === 'undefined') {
        $alert.removeClass('success').addClass('error').html(`
          <strong>TRANSMISSION FAILED // SDK UNAVAILABLE</strong><br>
          EmailJS SDK could not be loaded. Please verify your connection or transmit directly to <a href="mailto:${escapeHtml(activeConfig.recipientEmail)}" style="color:var(--accent-orange); text-decoration:underline;">${escapeHtml(activeConfig.recipientEmail)}</a>.
        `).fadeIn(300);
        return;
      }

      // Disable the submit button while sending to prevent duplicate submissions
      $submitBtn.prop('disabled', true).html('TRANSMITTING PACKET VIA EMAILJS...');

      // Payload parameters (supporting standard EmailJS template variable names)
      const templateParams = {
        name: nameVal,
        email: emailVal,
        subject: subjectVal,
        message: messageVal,
        // Standard template aliases for flexible template mappings:
        from_name: nameVal,
        from_email: emailVal,
        reply_to: emailVal,
        user_name: nameVal,
        user_email: emailVal,
        to_email: activeConfig.recipientEmail,
        time_stamp: new Date().toLocaleString()
      };

      emailjs.send(
        activeConfig.serviceId,
        activeConfig.templateId,
        templateParams,
        { publicKey: activeConfig.publicKey }
      ).then(function (response) {
        // Show success message ONLY after EmailJS confirms successful delivery
        $submitBtn.prop('disabled', false).html(originalBtnText);
        $alert.removeClass('error').addClass('success').html(`
          <strong>TRANSMISSION DELIVERED // DISPATCH CONFIRMED</strong><br>
          Thank you, ${escapeHtml(nameVal)}! Your message has been successfully delivered to Ajith's Gmail (<strong>${escapeHtml(activeConfig.recipientEmail)}</strong>). A response will be dispatched promptly.
        `).fadeIn(300);

        $form[0].reset();

        setTimeout(function () {
          $alert.fadeOut(500);
        }, 10000);
      }).catch(function (error) {
        // Show clear error message if sending fails
        $submitBtn.prop('disabled', false).html(originalBtnText);
        const errDetail = error && (error.text || error.message || (typeof error === 'string' ? error : ''));
        let errHint = '';
        if (errDetail && errDetail.toLowerCase().includes('template id not found')) {
          errHint = `<br><span style="font-size:0.85em; opacity:0.9;">Template ID '<strong>${escapeHtml(activeConfig.templateId)}</strong>' was not found on EmailJS for account key <strong>${escapeHtml(activeConfig.publicKey)}</strong>. In EmailJS Dashboard, verify under Templates &rarr; Settings that the ID matches and has been Saved.</span>`;
        }
        const errString = errDetail ? ` (${escapeHtml(errDetail)})` : '';
        $alert.removeClass('success').addClass('error').html(`
          <strong>TRANSMISSION FAILED // DISPATCH ERROR</strong><br>
          Unable to deliver message to <strong>${escapeHtml(activeConfig.recipientEmail)}</strong>${errString}.${errHint}<br>
          Please verify your connection or transmit directly to <a href="mailto:${escapeHtml(activeConfig.recipientEmail)}" style="color:var(--accent-orange); text-decoration:underline;">${escapeHtml(activeConfig.recipientEmail)}</a>.
        `).fadeIn(300);
      });
    });
  }

  // 9. Bio-data Privacy Shield Toggle (Works on biodata.html)
  function initPrivacyShield() {
    const $shieldBtn = $('#privacy-shield-toggle');
    if (!$shieldBtn.length) return;

    let isShieldActive = true;

    $shieldBtn.on('click', function () {
      isShieldActive = !isShieldActive;
      updatePrivacyUI(isShieldActive);
    });

    // Individual click to reveal
    $(document).on('click', '.shielded-text', function (e) {
      if (!$(this).hasClass('revealed')) {
        e.preventDefault();
        $(this).addClass('revealed');
      }
    });

    function updatePrivacyUI(active) {
      if (active) {
        $shieldBtn.removeClass('shield-off').addClass('shield-on');
        $shieldBtn.html('🛡️ PRIVACY SHIELD: ACTIVE (SENSITIVE FIELDS MASKED)');
        $('.shielded-text').removeClass('revealed');
      } else {
        $shieldBtn.removeClass('shield-on').addClass('shield-off');
        $shieldBtn.html('⚠️ PRIVACY SHIELD: INACTIVE (ALL DATA REVEALED)');
        $('.shielded-text').addClass('revealed');
      }
    }
  }

  // 10. Back to Top Button
  function initBackToTop() {
    $('#back-to-top-btn').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>'"]/g, function (tag) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag);
    });
  }

})(typeof window !== 'undefined' && window.jQuery ? window.jQuery : (typeof jQuery !== 'undefined' ? jQuery : null));
