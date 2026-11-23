/**
 * AJITH-TECHVERSE // NEXUS 2040 – THE DIGITAL INTELLIGENCE LAB
 * AJITH AI ASSISTANT (chatbot.js)
 * Local Knowledge-Based Deterministic Assistant with Natural Fuzzy Matching
 */

(function () {
  'use strict';

  // Verified Knowledge Base
  const KNOWLEDGE_BASE = {
    bio: {
      keywords: ['who', 'about', 'ajith', 'ajithkumar', 'introduce', 'profile', 'bio', 'identity'],
      response: `<strong>Ajithkumar H M</strong> is a motivated Computer Science and Engineering student at <strong>Rajeev Institute of Technology (RIT), Hassan</strong> (VTU Affiliated). He specializes in Artificial Intelligence & Machine Learning, Data Analytics, Cybersecurity, and Full Stack Development with a passion for building practical, secure, and intelligent systems.`
    },
    education: {
      keywords: ['education', 'college', 'degree', 'cgpa', 'school', 'marks', 'percentage', 'vtu', 'rit', 'puc', 'sslc', 'study', 'academic'],
      response: `<strong>Academic Pedigree:</strong><br>
• <strong>B.E. in Computer Science & Engineering</strong> — Rajeev Institute of Technology, Hassan (VTU Affiliated). Expected Graduation: <strong>2028</strong> | Current CGPA: <strong>8.0 / 10</strong><br>
• <strong>Pre-University Course (PUC)</strong>: <strong>94.66%</strong> (Distinction)<br>
• <strong>SSLC (Secondary School)</strong>: <strong>79.8%</strong><br>
<a href="resume.html" style="color:var(--accent-orange); text-decoration:underline;">View full Resume page ↗</a>`
    },
    skills: {
      keywords: ['skill', 'skills', 'stack', 'technologies', 'programming', 'languages', 'python', 'tools'],
      response: `<strong>Core Technical Arsenal:</strong><br>
• <strong>Languages:</strong> Python, C, Dart, JavaScript (ES6+), TypeScript, SQL, HTML5/CSS3<br>
• <strong>AI & ML:</strong> Scikit-learn, TensorFlow, Roboflow (YOLO), Gradient Boosting, LLM Foundations<br>
• <strong>Web & Backend:</strong> FastAPI, Flask, React, Node.js, REST APIs, SQLAlchemy<br>
• <strong>Mobile & Cloud:</strong> Flutter, Docker, Git/GitHub, Google Cloud Skills Boost`
    },
    projects: {
      keywords: ['project', 'projects', 'portfolio', 'built', 'work', 'case study', 'apps'],
      response: `Ajith has developed <strong>5 major production-grade projects</strong>:<br>
1. <strong>NetGuard AI</strong> — ML Network Intrusion Detection System (99.68% accuracy)<br>
2. <strong>StayIQ</strong> — Airbnb Yield & Booking Intelligence Platform<br>
3. <strong>FraudShield AI</strong> — Transaction Fraud Intelligence Platform<br>
4. <strong>Civic AI</strong> — Smart City Municipal Issue Detection (Computer Vision)<br>
5. <strong>HarvestLink</strong> — AI-Powered Multilingual Agriculture Marketplace (Flutter)<br>
<em>Ask me to explain any project, e.g., "Explain NetGuard AI"!</em>`
    },
    netguard: {
      keywords: ['netguard', 'intrusion', 'nids', 'network security', 'packet', 'ddos', 'gradient boosting', '99.68'],
      response: `<strong>NetGuard AI // ML Network Intrusion Detection System:</strong><br>
• <strong>Problem:</strong> Traditional signature-based firewalls fail against zero-day exploits and high-speed multi-vector attacks.<br>
• <strong>Solution:</strong> An ensemble Gradient Boosting pipeline ingesting real-time packet telemetry with <strong>99.68% reported validation accuracy</strong>.<br>
• <strong>Stack:</strong> Python, Scikit-learn, FastAPI, Docker, Async Packet Preprocessing.`
    },
    stayiq: {
      keywords: ['stayiq', 'airbnb', 'booking', 'yield', 'pricing', 'demand'],
      response: `<strong>StayIQ // Airbnb Booking Intelligence Platform:</strong><br>
• <strong>Problem:</strong> Property managers struggle with dynamic market volatility and late booking cancellations.<br>
• <strong>Solution:</strong> Predictive regression and classification models delivering dynamic nightly price recommendations, churn risk scoring, and 90-day demand forecasts.<br>
• <strong>Stack:</strong> Python, React, TypeScript, FastAPI, SQLAlchemy, Scikit-learn.`
    },
    fraudshield: {
      keywords: ['fraud', 'fraudshield', 'transaction', 'financial', 'risk'],
      response: `<strong>FraudShield AI // Fraud Intelligence Platform:</strong><br>
• <strong>Problem:</strong> Rapid escalation of unauthorized card and account takeover fraud in high-frequency financial streams.<br>
• <strong>Solution:</strong> Real-time anomaly scoring utilizing Isolation Forests and multi-factor geo-velocity heuristics with sub-10ms evaluation latency.<br>
• <strong>Stack:</strong> Python, Flask, React, Scikit-learn.`
    },
    civicai: {
      keywords: ['civic', 'civic ai', 'smart city', 'pothole', 'garbage', 'leakage', 'vision', 'yolo'],
      response: `<strong>Civic AI // Smart City Issue Detection:</strong><br>
• <strong>Problem:</strong> Manual municipal inspection of road hazards, burst pipes, and waste accumulation is slow and reactive.<br>
• <strong>Solution:</strong> Computer vision pipeline trained via Roboflow and TensorFlow to autonomously locate potholes, garbage piles, and water leakage from urban camera feeds.<br>
• <strong>Stack:</strong> Python, TensorFlow, Roboflow, Flask, React.`
    },
    harvestlink: {
      keywords: ['harvest', 'harvestlink', 'agriculture', 'farmer', 'crop', 'flutter', 'dart'],
      response: `<strong>HarvestLink // AI-Powered Agriculture Marketplace:</strong><br>
• <strong>Problem:</strong> Farmers suffer from intermediary price exploitation, fragmented logistics, and lack of localized climate advisories.<br>
• <strong>Solution:</strong> Cross-platform mobile ecosystem connecting farmers directly to buyers with voice-guided AI crop advisories in Kannada & English.<br>
• <strong>Stack:</strong> Flutter, Dart, Provider State Management, REST APIs.`
    },
    certifications: {
      keywords: ['cert', 'certifications', 'google cloud', 'credentials', 'badge', 'genai'],
      response: `<strong>Google Cloud Credentials:</strong><br>
1. <strong>Introduction to Generative AI</strong> — Google Cloud Skills Boost<br>
2. <strong>Gen AI Apps: Transform Your Work</strong> — Google Cloud Skills Boost<br>
3. <strong>Gen AI Agents: Transform Your Organization</strong> — Google Cloud Skills Boost<br>
All credentials emphasize foundational generative models, agentic workflows, and cloud-native AI integration.`
    },
    internship: {
      keywords: ['intern', 'internship', 'experience', 'industry', 'company'],
      response: `<strong>Internship & Industry Exposure:</strong><br>
Ajith participates in applied software and intelligent systems engineering. Currently focused on academic-industry research collaborations in Machine Learning and Full Stack development at Rajeev Institute of Technology.<br>
<em>Verified certificates are available on request and highlighted in the portfolio showcase!</em>`
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'reach', 'message', 'hire', 'talk'],
      response: `<strong>Direct Communication Channels:</strong><br>
• <strong>Email:</strong> <a href="mailto:mrajithsagar123@gmail.com" style="color:var(--accent-orange); text-decoration:underline;">mrajithsagar123@gmail.com ↗</a><br>
• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/Ajithkumar-hm-0744613a0" target="_blank" rel="noopener" style="color:var(--accent-orange); text-decoration:underline;">Ajithkumar H M on LinkedIn ↗</a><br>
• <strong>GitHub:</strong> <a href="https://github.com/Ajith-Kumar55" target="_blank" rel="noopener" style="color:var(--accent-orange); text-decoration:underline;">github.com/Ajith-Kumar55 ↗</a><br>
• <strong>Location:</strong> Hassan, Karnataka, India<br>
Or use the <strong>Transmit Dispatch</strong> contact form on this page!`
    },
    github: {
      keywords: ['github', 'git', 'repo', 'repositories', 'codebase', 'source'],
      response: `<strong>GitHub Repository Hub:</strong><br>
Visit Ajith's official profile at <a href="https://github.com/Ajith-Kumar55" target="_blank" rel="noopener" style="color:var(--accent-orange); font-weight:bold;">github.com/Ajith-Kumar55 ↗</a> to explore active repositories, commit histories, and open-source contributions.`
    },
    resume: {
      keywords: ['resume', 'cv', 'biodata', 'bio-data', 'download'],
      response: `You can access both official career documents right now:<br>
• <a href="resume.html" style="color:var(--accent-orange); font-weight:bold;">View Professional Resume Page ↗</a> (Recruiter-tailored with 1-click PDF print)<br>
• <a href="biodata.html" style="color:var(--accent-orange); font-weight:bold;">View Personal Bio-data Page ↗</a> (Formal personal records with Privacy Shield)`
    }
  };

  const FALLBACK_RESPONSE = `I didn't quite catch that query. You can ask me about:<br>
• <strong>Ajith's Education & VTU Marks</strong><br>
• <strong>Technical Skills & Tools</strong><br>
• <strong>NetGuard AI, StayIQ, or other Projects</strong><br>
• <strong>Google Cloud Certifications</strong><br>
• <strong>GitHub & Contact Links</strong><br>
Or click any of the quick suggestion chips below!`;

  function initChatbot() {
    const trigger = document.getElementById('chatbot-trigger');
    const panel = document.getElementById('chatbot-panel');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    const clearBtn = document.getElementById('chatbot-clear');
    const chipBtns = document.querySelectorAll('.chat-quick-chips .chip-btn');

    if (!trigger || !panel) return;

    // Toggle Panel Open/Close
    trigger.addEventListener('click', function () {
      panel.classList.toggle('open');
      if (panel.classList.contains('open') && input) {
        input.focus();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        panel.classList.remove('open');
      });
    }

    // Send Message on Enter
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          handleUserSend();
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', handleUserSend);
    }

    // Quick chips handler
    chipBtns.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const query = this.getAttribute('data-query') || this.innerText;
        processUserQuery(query);
      });
    });

    // Clear chat
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (messages) {
          messages.innerHTML = `
            <div class="chat-bubble bot">
              <strong>Session Reset.</strong> Greetings! I am the <strong>AJITH AI ASSISTANT</strong>, a deterministic local intelligence engine for the Nexus 2040 portfolio. How may I assist you today?
            </div>
          `;
        }
      });
    }

    function handleUserSend() {
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      processUserQuery(text);
    }

    function processUserQuery(text) {
      if (!messages) return;

      // Append User Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = text;
      messages.appendChild(userBubble);
      messages.scrollTop = messages.scrollHeight;

      // Show Bot Typing Indicator
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot typing-indicator';
      typingBubble.innerHTML = '<em>Consulting local knowledge base...</em>';
      messages.appendChild(typingBubble);
      messages.scrollTop = messages.scrollHeight;

      // Natural delay (350ms) to feel reactive yet authentic
      setTimeout(function () {
        typingBubble.remove();

        const reply = findBestMatch(text);
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = reply;
        messages.appendChild(botBubble);
        messages.scrollTop = messages.scrollHeight;
      }, 350);
    }

    function findBestMatch(userText) {
      const lower = userText.toLowerCase().replace(/[^\w\s]/g, ' ');
      const words = lower.split(/\s+/).filter(Boolean);

      let bestCategory = null;
      let highestScore = 0;

      for (const key in KNOWLEDGE_BASE) {
        const item = KNOWLEDGE_BASE[key];
        let score = 0;

        for (const kw of item.keywords) {
          // Check if whole keyword is present in user text
          if (lower.includes(kw)) {
            score += 3;
          }
          // Check individual word matches
          for (const w of words) {
            if (w === kw) {
              score += 2;
            } else if (w.length > 3 && kw.includes(w)) {
              score += 1;
            }
          }
        }

        if (score > highestScore) {
          highestScore = score;
          bestCategory = key;
        }
      }

      if (highestScore > 0 && bestCategory) {
        return KNOWLEDGE_BASE[bestCategory].response;
      }

      return FALLBACK_RESPONSE;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
