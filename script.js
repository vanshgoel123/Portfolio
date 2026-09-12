/* ==========================================================================
   Vansh Goel: DevOps and Cloud Engineer Portfolio
   Interactive Engine, Digital Twin AI & Visitor Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode and Interactive Accent Colors)
  initThemeAndPalette();

  // 2. Dynamic Typing Subtitle
  initTypedLine();

  // 3. Animated Metric Counters
  initCounters();

  // 4. Mobile Navigation Toggle
  initMobileNav();

  // 5. Active Scroll Spy
  initScrollSpy();

  // 6. Interactive DevOps CI/CD Pipeline Simulator
  initPipelineSimulator();

  // 7. Interactive 3D Card Tilt Effect
  init3DTilt();

  // 8. Interactive Visitor Reactions & Emoji Bursts
  initReactions();

  // 9. DevOps AI Assistant (First-Person Digital Twin + CLI Commands)
  initAIAssistant();

  // 10. Contact Form Handler
  initContactForm();

  // 11. Update Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   1. Theme & Accent Color Palette Management
   -------------------------------------------------------------------------- */
function initThemeAndPalette() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const paletteBtns = document.querySelectorAll('.color-dot-btn');

  const storedTheme = localStorage.getItem('vg_theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let currentTheme = storedTheme || (systemPrefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  const storedAccent = localStorage.getItem('vg_accent') || 'emerald';
  document.documentElement.setAttribute('data-accent', storedAccent);
  updateActivePaletteBtn(storedAccent);
  updateFavicon(currentTheme);

  function updateFavicon(theme) {
    const faviconTag = document.querySelector('link[rel="icon"]');
    if (!faviconTag) return;
    faviconTag.href = theme === 'light' ? 'favicon-light.svg' : 'favicon.svg';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('vg_theme', currentTheme);
      updateFavicon(currentTheme);
    });
  }

  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedColor = btn.getAttribute('data-color');
      if (selectedColor) {
        document.documentElement.setAttribute('data-accent', selectedColor);
        localStorage.setItem('vg_accent', selectedColor);
        updateActivePaletteBtn(selectedColor);
      }
    });
  });

  function updateActivePaletteBtn(color) {
    paletteBtns.forEach(btn => {
      if (btn.getAttribute('data-color') === color) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typing Subtitle
   -------------------------------------------------------------------------- */
function initTypedLine() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const lines = [
    "managing 30+ virtual machines and cloud infra on GCP...",
    "automating CI/CD delivery pipelines with Jenkins...",
    "provisioning immutable cloud infrastructure with Terraform...",
    "orchestrating containers with Docker and PM2...",
    "observing live system metrics in Prometheus & Grafana...",
    "engineering reliability that keeps production systems up."
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 38;

  function typeStep() {
    const currentLine = lines[lineIdx];

    if (!isDeleting) {
      charIdx++;
      typedEl.textContent = currentLine.substring(0, charIdx);

      if (charIdx === currentLine.length) {
        isDeleting = true;
        setTimeout(typeStep, 1800);
        return;
      }
    } else {
      charIdx--;
      typedEl.textContent = currentLine.substring(0, charIdx);

      if (charIdx === 0) {
        isDeleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(typeStep, 350);
        return;
      }
    }

    const currentSpeed = isDeleting ? 20 : typingSpeed;
    setTimeout(typeStep, currentSpeed);
  }

  typeStep();
}

/* --------------------------------------------------------------------------
   3. Animated Metric Counters
   -------------------------------------------------------------------------- */
function initCounters() {
  const counterEls = document.querySelectorAll('[data-counter]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseFloat(target.getAttribute('data-counter'));
        const isDecimal = targetValue % 1 !== 0;
        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetValue * easeProgress;

          target.textContent = isDecimal ? currentVal.toFixed(2) : Math.floor(currentVal);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = isDecimal ? targetValue.toFixed(2) : targetValue;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counterEls.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('main-nav');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.textContent = isOpen ? '✕' : '☰';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.textContent = '☰';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Active Scroll Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   6. Interactive DevOps CI/CD Pipeline Simulator
   -------------------------------------------------------------------------- */
function initPipelineSimulator() {
  const runBtn = document.getElementById('run-pipeline-btn');
  if (!runBtn) return;

  const steps = [
    document.querySelector('.step-git'),
    document.querySelector('.step-cicd'),
    document.querySelector('.step-iac'),
    document.querySelector('.pipeline-clouds-row'),
    document.querySelector('.step-runtime'),
    document.querySelector('.pipeline-obs-strip')
  ];

  const footerStatus = document.querySelector('.diagram-footer .status-text');
  const origFooter = footerStatus ? footerStatus.innerHTML : '';
  let isSimulating = false;

  runBtn.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    runBtn.classList.add('running');
    runBtn.innerHTML = '<span>⚡</span> Deploying...';

    // Reset any previous active states
    steps.forEach(s => s && s.classList.remove('sim-active'));

    // Step 1: Git push
    setTimeout(() => {
      if (steps[0]) steps[0].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [git] Pushed commit e49f01b to origin/main...';
    }, 200);

    // Step 2: CI/CD Build & Tests
    setTimeout(() => {
      if (steps[0]) steps[0].classList.remove('sim-active');
      if (steps[1]) steps[1].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [jenkins] Building Docker image and running test suite... (Passed ✓)';
    }, 1100);

    // Step 3: Terraform IaC
    setTimeout(() => {
      if (steps[1]) steps[1].classList.remove('sim-active');
      if (steps[2]) steps[2].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [terraform] Provisioning infrastructure and network policies... (0 errors ✓)';
    }, 2100);

    // Step 4: Multi-Cloud
    setTimeout(() => {
      if (steps[2]) steps[2].classList.remove('sim-active');
      if (steps[3]) steps[3].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [cloud] Deploying to GCP Compute Engine and AWS clusters... (Healthy ✓)';
    }, 3000);

    // Step 5: Docker & PM2 Runtime
    setTimeout(() => {
      if (steps[3]) steps[3].classList.remove('sim-active');
      if (steps[4]) steps[4].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [runtime] Containers live on port 8000 with zero downtime ✓';
    }, 3900);

    // Step 6: Observability Live
    setTimeout(() => {
      if (steps[4]) steps[4].classList.remove('sim-active');
      if (steps[5]) steps[5].classList.add('sim-active');
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> [metrics] Prometheus & Grafana streaming telemetry (Latency: 22ms ✓)';
    }, 4800);

    // Completed
    setTimeout(() => {
      steps.forEach(s => s && s.classList.remove('sim-active'));
      runBtn.classList.remove('running');
      runBtn.innerHTML = '<span>✓</span> Deployed!';
      if (footerStatus) footerStatus.innerHTML = '<i class="status-dot"></i> Deployment complete! Zero downtime, 99.9% healthy.';

      setTimeout(() => {
        runBtn.innerHTML = '▶ Simulate Run';
        if (footerStatus) footerStatus.innerHTML = origFooter;
        isSimulating = false;
      }, 3500);
    }, 5800);
  });
}

/* --------------------------------------------------------------------------
   7. Interactive 3D Card Tilt Effect
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length || window.innerWidth < 768) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   8. Interactive Visitor Reactions & Floating Emoji Particles
   -------------------------------------------------------------------------- */
function initReactions() {
  const reactionBtns = document.querySelectorAll('.reaction-btn');
  if (!reactionBtns.length) return;

  const EMOJI_MAP = {
    rock: '🚀',
    fire: '🔥',
    heart: '💡',
    hire: '🎯'
  };

  reactionBtns.forEach(btn => {
    const type = btn.getAttribute('data-reaction');
    const countEl = btn.querySelector('.count');

    // Load persisted state
    if (localStorage.getItem('vg_reaction_' + type)) {
      btn.classList.add('liked');
    }

    btn.addEventListener('click', (e) => {
      const alreadyLiked = btn.classList.contains('liked');
      let count = parseInt(countEl.textContent, 10) || 0;

      if (!alreadyLiked) {
        count++;
        countEl.textContent = count;
        btn.classList.add('liked');
        localStorage.setItem('vg_reaction_' + type, 'true');

        // Spawn particle burst
        spawnEmojiParticles(e.clientX, e.clientY, EMOJI_MAP[type] || '✨');
      } else {
        count = Math.max(0, count - 1);
        countEl.textContent = count;
        btn.classList.remove('liked');
        localStorage.removeItem('vg_reaction_' + type);
      }
    });
  });

  function spawnEmojiParticles(x, y, emoji) {
    for (let i = 0; i < 5; i++) {
      const p = document.createElement('div');
      p.className = 'floating-emoji';
      p.textContent = emoji;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 80;
      const rot = (Math.random() - 0.5) * 60;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }
}

/* --------------------------------------------------------------------------
   9. DevOps AI Assistant (First-Person Digital Twin + CLI Commands)
   -------------------------------------------------------------------------- */
function initAIAssistant() {
  const chatFeed = document.getElementById('ai-feed');
  const chatInput = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send');
  const chipButtons = document.querySelectorAll('.ai-chip');

  if (!chatFeed || !chatInput || !sendBtn) return;

  let isResponding = false;

  // First-person conversational digital twin knowledge base
  const INTENTS = [
    {
      id: 'why_devops',
      priority: 95,
      patterns: [/why\s+(devops|dev\s*ops)/i, /how.*(start|into|learn).*(devops|infra)/i, /why.*(choose|pick|get into).*(devops|infra)/i, /story/i, /origin/i, /inspiration/i],
      answer: "Here is my story of why I chose DevOps:\n\nWhen I was building my backend project, I got completely stuck trying to deploy it to production and was unable to show it to real users beyond my own laptop. That roadblock sparked my curiosity about deployment automation and server infrastructure. I discovered DevOps, started learning CI/CD, Docker containerization, and cloud management, and quickly fell in love with building resilient systems that stay up 24/7. That passion drove me from local scripts to managing 30+ production VMs on GCP at Devnagri!"
    },
    {
      id: 'hiring',
      priority: 90,
      patterns: [/\b(hir[a-z]*|recruit[a-z]*|job|vacancy|opening|role|contract|interview|join\s+us|work\s+with|work\s+for)\b/i, /open\s+to\s+work/i, /availab[a-z]*/i],
      answer: "Exciting to hear you have an opportunity! Yes, I am actively open to DevOps Engineer, Cloud Infrastructure, and SRE roles and internships.\n\nI bring hands-on production experience:\n• Managing 30+ GCP virtual machines and services at Devnagri in Noida.\n• Designing automated Jenkins CI/CD pipelines (accelerated releases by 60%).\n• Docker containerization and PM2 process supervision.\n• Observability with Prometheus, Grafana, Promtail, and Node Exporter.\n\nLet's connect directly:\n• Email: itsvansh247776@gmail.com\n• Phone or WhatsApp: +91 8445916990\n• LinkedIn: https://www.linkedin.com/in/vansh-goel-0756ab27a/\n\nOr drop me a message using the form below!"
    },
    {
      id: 'devnagri',
      priority: 85,
      patterns: [/devnagri/i, /noida/i, /internship/i, /work\s+experience/i, /past\s+work/i, /job\s+history/i, /production/i],
      answer: "During my DevOps internship at Devnagri in Noida, India (April 2026 to August 2026), I:\n• Managed Linux production and development infrastructure across 30+ VMs on Google Cloud Platform (GCP).\n• Built and maintained 14+ Jenkins CI/CD pipelines for Next.js, Laravel, and Python, cutting deploy time from 10 minutes down to 4 minutes (60% speedup).\n• Migrated 20+ services from Byobu sessions to PM2 for standardized supervision and automated restarts.\n• Configured Nginx and Traefik reverse proxies across 5 services with SSL and GCP firewall rules.\n• Implemented observability with Prometheus, Grafana, Promtail, and Node Exporter.\n• Diagnosed and resolved 20+ production service outages with root cause debugging."
    },
    {
      id: 'projects',
      priority: 80,
      patterns: [/project/i, /built/i, /build/i, /autodevops/i, /cloud\s*ide/i, /paas/i, /demo/i, /repo/i],
      answer: "Here are two of my featured production-grade projects:\n\n1. AutoDevOps Control (FastAPI, Docker, Celery, Redis, AWS):\n   A mini PaaS platform I built that deploys applications using repository metadata and user AWS credentials with asynchronous build queues.\n   • Live Demo: https://autodevops.vanshgoel.tech/\n   • Repo: https://github.com/vanshgoel123/AutoDevOps-Control\n\n2. Cloud IDE Platform (Docker, FastAPI, GitHub Actions, Docker Compose):\n   On-demand isolated Docker-based VS Code workspaces I built to eliminate dependency conflicts, with CPU/RAM limits, idle cleanup, and soft-delete protections.\n   • Live Demo: https://cloudid.vanshgoel.tech/\n   • Repo: https://github.com/vanshgoel123/cloud-ide-platform"
    },
    {
      id: 'skills',
      priority: 75,
      patterns: [/skill/i, /tech\s*stack/i, /stack/i, /tool/i, /technolog/i, /language/i, /docker/i, /jenkins/i, /terraform/i, /kubernetes/i, /gcp/i, /aws/i, /prometheus/i],
      answer: "Here is my technical toolkit:\n• Cloud Platforms: GCP (Compute Engine, IAM, VPC, Cloud Storage, Firewall Rules) & AWS (EC2, S3, IAM, VPC)\n• CI/CD & IaC: Jenkins, GitHub Actions, Terraform, Ansible\n• Containers & Virtualization: Docker, Docker Compose\n• Monitoring & Observability: Prometheus, Grafana, Promtail, Node Exporter\n• Web Servers & Proxies: Nginx, Traefik, PM2, SSL/TLS\n• Languages: Python, Go, Bash, C/C++, Java, JavaScript"
    },
    {
      id: 'education',
      priority: 70,
      patterns: [/education/i, /college/i, /university/i, /iiit/i, /degree/i, /cgpa/i, /gpa/i, /study/i],
      answer: "I am pursuing my Bachelor of Technology in Computer Science and Engineering at IIIT Naya Raipur (August 2023 to June 2027), currently maintaining an 8.35 / 10.00 CGPA."
    },
    {
      id: 'credentials',
      priority: 65,
      patterns: [/certif/i, /udemy/i, /award/i, /achievement/i, /shark\s*tank/i, /23ventures/i, /competition/i],
      answer: "Here are my verified credentials and competition honors:\n1. Decoding DevOps: Basics to Advanced Projects with AI (Udemy, 64 hours)\n   Verification link: https://drive.google.com/file/d/10thRu2Sg-3Be9ZGWQLuvOOwfaXhVg0DE/view?usp=sharing\n\n2. GitHub Actions: The Complete Guide (Udemy)\n   Verification link: https://drive.google.com/file/d/1BxjeMmm4eY10rmU4HPqYz4yjc0YMkhxT/view?usp=sharing\n\n3. Second Runner Up at 23Ventures Entrepreneurship Challenge 2025 (100+ teams)\n   Verification link: https://drive.google.com/file/d/1fEKgFUK72xWOg7eU3C3WlVvo1Yv9kXwb/view?usp=sharing\n\n4. Top 15 Finalist at Shark Tank Chhattisgarh (Young Indian Hub 2025)."
    },
    {
      id: 'contact',
      priority: 60,
      patterns: [/\b(contact|email|phone|whatsapp|call|reach|linkedin|github|portfolio)\b/i],
      answer: "You can reach me directly through:\n• Email: itsvansh247776@gmail.com\n• Phone / WhatsApp: +91 8445916990\n• LinkedIn: https://www.linkedin.com/in/vansh-goel-0756ab27a/\n• GitHub: https://github.com/vanshgoel123\n• Website: https://vanshgoel.tech\n\nOr scroll down to the contact form to drop me a note!"
    },
    {
      id: 'greeting',
      priority: 10,
      patterns: [/^\s*(hi|hello|hey|greetings|yo|sup)\b/i, /\b(who\s+are\s+you|what\s+can\s+you\s+do)\b/i],
      answer: "Hey there! I am Vansh's interactive AI assistant. Ask me anything about my cloud experience, my production work at Devnagri in Noida, my projects AutoDevOps Control and Cloud IDE, why I chose DevOps, or whether I'm available for hire!"
    }
  ];

  const FALLBACK_REPLY = "I don't have that exact detail in my verified engineering profile, but here is a quick overview: I am a DevOps Engineer and CS student at IIIT Naya Raipur (8.35 CGPA) with production experience at Devnagri in Noida (managing 30+ GCP VMs, Jenkins CI/CD, PM2, Prometheus/Grafana) and production projects including AutoDevOps Control and Cloud IDE. You can reach me directly at itsvansh247776@gmail.com or +91 8445916990.";

  // CLI Command Easter Eggs & Quick Shortcuts
  function handleCLICommand(cmd) {
    const cleanCmd = cmd.toLowerCase().trim();

    if (cleanCmd === 'clear') {
      chatFeed.innerHTML = `
        <div class="ai-welcome-banner">
          <div class="icon">⚡</div>
          <div>
            <h4>Console Cleared</h4>
            <p style="margin-bottom:8px;">Ready for your next question! Ask about my cloud experience, projects, or hireability.</p>
            <div style="font-family:var(--font-mono); font-size:12px; color:var(--muted); display:flex; align-items:center; flex-wrap:wrap; gap:6px;">
              <span>Quick commands:</span>
              <span class="cmd-pill" data-cmd="help">help</span>
              <span class="cmd-pill" data-cmd="story">story</span>
              <span class="cmd-pill" data-cmd="devnagri">devnagri</span>
              <span class="cmd-pill" data-cmd="projects">projects</span>
              <span class="cmd-pill" data-cmd="sudo hire vansh">sudo hire vansh</span>
            </div>
          </div>
        </div>
      `;
      return true;
    }

    if (cleanCmd === 'sudo hire vansh' || cleanCmd === 'hire vansh' || cleanCmd === 'sudo hire') {
      appendChatRow(cmd, 'user');
      const typing = appendTypingRow();
      setTimeout(() => {
        typing.remove();
        appendChatRow("🎉 Access granted with root permissions! Opening your email client to hire me directly...", 'bot');
        window.location.href = "mailto:itsvansh247776@gmail.com?subject=Offer%20for%20Vansh%20Goel%20-%20DevOps%20Role";
      }, 600);
      return true;
    }

    if (cleanCmd === 'help' || cleanCmd === 'commands' || cleanCmd === '?') {
      appendChatRow(cmd, 'user');
      const typing = appendTypingRow();
      setTimeout(() => {
        typing.remove();
        appendChatRow("CLI commands supported (click any badge below or type):\n• `story`: Why I chose DevOps\n• `devnagri`: View my internship contributions\n• `projects`: AutoDevOps Control & Cloud IDE Platform\n• `stack`: My cloud & DevOps tooling\n• `certs`: Verified credentials & awards\n• `contact`: Direct contact channels\n• `sudo hire vansh`: Fast-track hire\n• `clear`: Clear console feed", 'bot');
      }, 300);
      return true;
    }

    return false;
  }

  function getAnswer(query) {
    const q = query.trim();
    if (!q) return FALLBACK_REPLY;

    const sortedIntents = [...INTENTS].sort((a, b) => b.priority - a.priority);

    for (const intent of sortedIntents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(q)) {
          return intent.answer;
        }
      }
    }

    return FALLBACK_REPLY;
  }

  function appendChatRow(content, sender) {
    const row = document.createElement('div');
    row.className = `chat-row ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    if (sender === 'user') {
      bubble.textContent = content;
    } else {
      bubble.innerHTML = formatBotResponse(content);
    }

    row.appendChild(bubble);
    chatFeed.appendChild(row);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    return row;
  }

  function appendTypingRow() {
    const row = document.createElement('div');
    row.className = 'chat-row bot typing-row';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';

    row.appendChild(bubble);
    chatFeed.appendChild(row);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    return row;
  }

  function handleSend(query) {
    if (!query || isResponding) return;

    if (handleCLICommand(query)) {
      chatInput.value = '';
      return;
    }

    isResponding = true;
    appendChatRow(query, 'user');
    chatInput.value = '';

    const typingEl = appendTypingRow();
    const delay = 350 + Math.random() * 300;

    setTimeout(() => {
      typingEl.remove();
      const answer = getAnswer(query);
      appendChatRow(answer, 'bot');
      isResponding = false;
    }, delay);
  }

  sendBtn.addEventListener('click', () => {
    handleSend(chatInput.value.trim());
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend(chatInput.value.trim());
    }
  });

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      if (q) handleSend(q);
    });
  });

  // Handle clicks on any .cmd-pill in the DOM (help menu, welcome banner, etc.)
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.cmd-pill');
    if (pill) {
      const cmd = pill.getAttribute('data-cmd') || pill.textContent.trim();
      if (cmd) handleSend(cmd);
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatBotResponse(text) {
  let formatted = escapeHtml(text);
  // Transform backticks `cmd` into interactive clickable .cmd-pill badges
  formatted = formatted.replace(/`([^`]+)`/g, '<span class="cmd-pill" data-cmd="$1">$1</span>');
  // Transform URLs into links
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  // Transform linebreaks
  formatted = formatted.replace(/\n/g, '<br>');
  return formatted;
}

/* --------------------------------------------------------------------------
   10. Contact Form Handler (Direct Email Draft Generator)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const subject = encodeURIComponent(`DevOps Inquiry from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`Hello Vansh,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`);

    window.location.href = `mailto:itsvansh247776@gmail.com?subject=${subject}&body=${body}`;
  });
}
