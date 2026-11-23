/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * GitHub Live API Integration & Fallback Engine (github.js)
 * Fetches public repos for Ajith-Kumar55 with resilient offline fallback
 */

(function () {
  'use strict';

  const GITHUB_USERNAME = 'Ajith-Kumar55';
  const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

  // Verified Fallback Repositories (Used when rate limited or offline)
  const FALLBACK_REPOS = [
    {
      name: 'NetGuard-AI',
      description: 'Machine Learning Network Intrusion Detection System with 99.68% reported validation accuracy and real-time defense radar.',
      language: 'Python',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 14,
      forks_count: 5
    },
    {
      name: 'StayIQ-Platform',
      description: 'Airbnb booking yield intelligence platform with dynamic price forecasting and booking cancellation churn prevention.',
      language: 'TypeScript',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 11,
      forks_count: 3
    },
    {
      name: 'FraudShield-AI',
      description: 'Real-time financial transaction fraud intelligence and risk assessment platform utilizing isolation forests.',
      language: 'Python',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 9,
      forks_count: 2
    },
    {
      name: 'Civic-AI-Vision',
      description: 'Automated municipal hazard detection system for potholes, waste heaps, and water leakage using custom Roboflow YOLO models.',
      language: 'Python',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 8,
      forks_count: 3
    },
    {
      name: 'HarvestLink-App',
      description: 'Cross-platform agricultural marketplace and multilingual AI advisory application empowering direct farmer-to-buyer trade.',
      language: 'Dart',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 12,
      forks_count: 4
    },
    {
      name: 'AJITH-TECHVERSE',
      description: 'Nexus 2040 Digital Intelligence Lab — Production-grade multi-page portfolio with 3D WebGL, terminal CLI, and local AI assistant.',
      language: 'JavaScript',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 16,
      forks_count: 6
    }
  ];

  const LANG_COLORS = {
    'Python': '#3572A5',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Dart': '#00B4AB',
    'HTML': '#E34F26',
    'CSS': '#563D7C',
    'C': '#555555'
  };

  function initGitHubIntegration() {
    const container = document.getElementById('github-repos-container');
    const statusLabel = document.getElementById('github-feed-status');

    if (!container) return;

    fetch(API_URL, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('API Rate Limited or User Repos Private');
        }
        return response.json();
      })
      .then(function (data) {
        if (Array.isArray(data) && data.length > 0) {
          if (statusLabel) statusLabel.textContent = 'LIVE FEED // SYNCHRONIZED';
          renderRepos(data, container);
        } else {
          useFallback(container, statusLabel);
        }
      })
      .catch(function () {
        useFallback(container, statusLabel);
      });
  }

  function useFallback(container, statusLabel) {
    if (statusLabel) {
      statusLabel.textContent = 'CURATED LABORATORY REPOSITORIES // ACTIVE';
    }
    renderRepos(FALLBACK_REPOS, container);
  }

  function renderRepos(repos, container) {
    container.innerHTML = '';

    repos.slice(0, 6).forEach(function (repo) {
      const card = document.createElement('article');
      card.className = 'github-repo-card';

      const lang = repo.language || 'Code';
      const color = LANG_COLORS[lang] || '#FF5500';

      card.innerHTML = `
        <div class="repo-card-top">
          <h4 class="repo-name">${escapeHtml(repo.name)}</h4>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">
            ★ ${repo.stargazers_count || 0}
          </span>
        </div>
        <p class="repo-desc">${escapeHtml(repo.description || 'Verified open-source repository component.')}</p>
        <div class="repo-meta-row">
          <span>
            <span class="repo-lang-dot" style="background-color:${color};"></span>
            ${escapeHtml(lang)}
          </span>
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="social-link" style="font-size:0.78rem; color:var(--accent-orange);">
            Inspect Repo ↗
          </a>
        </div>
      `;

      container.appendChild(card);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitHubIntegration);
  } else {
    initGitHubIntegration();
  }
})();
