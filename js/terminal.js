/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * Interactive Developer Terminal (terminal.js)
 * Command Engine, Tab Autocomplete, History Navigation & Easter Eggs
 */

(function () {
  'use strict';

  const COMMANDS = {
    help: `Available commands:
  <span style="color:#FF5500;">about</span>       - Architectural summary of Ajithkumar H M
  <span style="color:#FF5500;">skills</span>      - Technical stack, frameworks and competencies
  <span style="color:#FF5500;">projects</span>    - Showcase of 5 core production-grade applications
  <span style="color:#FF5500;">education</span>   - Academic credentials (B.E. RIT, PUC, SSLC)
  <span style="color:#FF5500;">certifications</span> - Google Cloud Skills Boost credentials
  <span style="color:#FF5500;">contact</span>     - Direct contact channels, LinkedIn, GitHub
  <span style="color:#FF5500;">github</span>      - Launch GitHub repository profile
  <span style="color:#FF5500;">resume</span>      - Open professional resume document
  <span style="color:#FF5500;">biodata</span>     - Open personal bio-data document
  <span style="color:#FF5500;">theme</span>       - Toggle UI theme (dark / light)
  <span style="color:#FF5500;">matrix</span>      - Trigger digital intelligence matrix stream
  <span style="color:#FF5500;">whoami</span>      - Display current session authorization
  <span style="color:#FF5500;">clear</span>       - Clear terminal display buffer`,

    about: `[PROFILE // AJITHKUMAR H M]
Role: Computer Science Engineering Student | AI & ML | Data Analytics | Cybersecurity | Full Stack
Institution: Rajeev Institute of Technology, Hassan (VTU Affiliated)
Philosophy: "Building intelligence. Decoding data. Engineering the future."
Mission: Architecting resilient, high-accuracy intelligent applications across machine learning pipelines and modern cloud architectures.`,

    skills: `[TECHNICAL ARSENAL // NEXUS 2040]
• Languages:       Python, C, Dart, JavaScript (ES6+), TypeScript, SQL, HTML5/CSS3
• AI & Machine Learning: Scikit-learn, TensorFlow, Roboflow, Gradient Boosting, YOLOv8
• Web & Backend:   FastAPI, Flask, React, Node.js, SQLAlchemy, Docker, REST APIs
• Mobile Systems:  Flutter, Dart, Provider State Management, Offline Hive Storage
• Tools & Cloud:   Git, Linux Shell, Google Cloud Skills Boost, Docker Compose`,

    projects: `[CORE REPOSITORIES // CASE STUDIES]
01. NetGuard AI    - ML Network Intrusion Detection System (99.68% accuracy) [FastAPI/Docker]
02. StayIQ         - Airbnb Yield & Booking Intelligence Platform [React/FastAPI/Scikit]
03. FraudShield AI - Realtime Transaction Fraud Detection Radar [Flask/React/Scikit]
04. Civic AI       - Smart Municipal Computer Vision Hazard Detector [TensorFlow/Roboflow]
05. HarvestLink    - Multilingual AI Agriculture Marketplace [Flutter/Dart/REST]
Type 'github' to inspect source repositories!`,

    education: `[ACADEMIC PEDIGREE]
• Bachelor of Engineering (B.E.) — Computer Science & Engineering
  Rajeev Institute of Technology, Hassan (VTU Affiliated)
  Graduation Year: 2028 | Current CGPA: 8.0 / 10
• Pre-University Course (PUC): 94.66% Distinction
• Secondary School Leaving Certificate (SSLC): 79.8%`,

    certifications: `[GOOGLE CLOUD CREDENTIALS]
• Introduction to Generative AI — Google Cloud Skills Boost
• Gen AI Apps: Transform Your Work — Google Cloud Skills Boost
• Gen AI Agents: Transform Your Organization — Google Cloud Skills Boost`,

    contact: `[TRANSMIT CHANNELS]
• Email:     mrajithsagar123@gmail.com
• LinkedIn:  https://www.linkedin.com/in/Ajithkumar-hm-0744613a0
• GitHub:    https://github.com/Ajith-Kumar55
• Location:  Hassan, Karnataka, India
• Direct:    Submit transmission via the on-page dispatch form!`,

    github: `Redirecting to official GitHub profile...
URL: https://github.com/Ajith-Kumar55`,

    resume: `Opening resume module...
Navigating to resume.html (recruiter layout with PDF print engine).`,

    biodata: `Opening bio-data module...
Navigating to biodata.html (personal records with Privacy Shield).`,

    whoami: `guest@nexus-2040-lab [AUTH: VISITOR_SEC_LEVEL_1]`,

    date: function () {
      return new Date().toUTCString();
    },

    sudo: `[ALERT] Access denied: User is not in the sudoers file. This incident has been logged in NetGuard AI security registry.`,

    theme: function () {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('nexus_theme', next);
      return `Theme switched to [${next.toUpperCase()} MODE].`;
    },

    matrix: function () {
      return `01000001 01001010 01001001 01010100 01001000 // NEXUS-2040 INITIALIZED
[+] SYNAPSE_LOAD: 100%
[+] NEURAL_TENSORS: CONVERGED
[+] DEFENSE_GRID: SECURE`;
    }
  };

  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const log = document.getElementById('terminal-log');
    const screen = document.getElementById('terminal-screen');
    const quickHelpBtn = document.getElementById('terminal-quick-help');

    if (!input || !log) return;

    const history = [];
    let historyIndex = -1;

    // Focus input when clicking anywhere inside terminal screen
    if (screen) {
      screen.addEventListener('click', function () {
        input.focus();
      });
    }

    if (quickHelpBtn) {
      quickHelpBtn.addEventListener('click', function () {
        executeCommand('help');
      });
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        input.value = '';
        if (cmd) {
          history.push(cmd);
          historyIndex = history.length;
          executeCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete(input);
      }
    });

    function executeCommand(rawCmd) {
      const trimmed = rawCmd.trim();
      const parts = trimmed.split(/\s+/);
      const mainCmd = parts[0].toLowerCase();

      // Append Echo
      const entry = document.createElement('div');
      entry.className = 'term-entry';

      const echo = document.createElement('div');
      echo.className = 'term-cmd-echo';
      echo.innerHTML = `<span style="color:#FF5500;">guest@nexus-2040:~$</span> ${escapeHtml(trimmed)}`;
      entry.appendChild(echo);

      // Handle Clear
      if (mainCmd === 'clear') {
        log.innerHTML = '';
        return;
      }

      // Check command
      const respDiv = document.createElement('div');
      respDiv.className = 'term-resp';

      if (COMMANDS.hasOwnProperty(mainCmd)) {
        const handler = COMMANDS[mainCmd];
        let output = typeof handler === 'function' ? handler() : handler;
        respDiv.innerHTML = output;

        // Specialized redirects
        if (mainCmd === 'github') {
          setTimeout(function () {
            window.open('https://github.com/Ajith-Kumar55', '_blank');
          }, 800);
        } else if (mainCmd === 'resume') {
          setTimeout(function () {
            window.location.href = 'resume.html';
          }, 800);
        } else if (mainCmd === 'biodata') {
          setTimeout(function () {
            window.location.href = 'biodata.html';
          }, 800);
        }
      } else {
        respDiv.innerHTML = `<span style="color:#EF4444;">command not found: ${escapeHtml(mainCmd)}</span>. Type <span style="color:#FF5500;">'help'</span> for available commands.`;
      }

      entry.appendChild(respDiv);
      log.appendChild(entry);

      if (screen) {
        screen.scrollTop = screen.scrollHeight;
      }
    }

    function handleTabComplete(inputEl) {
      const val = inputEl.value.toLowerCase().trim();
      if (!val) return;
      const cmdList = Object.keys(COMMANDS);
      const matched = cmdList.filter(function (c) {
        return c.startsWith(val);
      });
      if (matched.length === 1) {
        inputEl.value = matched[0];
      }
    }

    function escapeHtml(str) {
      return str.replace(/[&<>'"]/g, function (tag) {
        return ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminal);
  } else {
    initTerminal();
  }
})();
