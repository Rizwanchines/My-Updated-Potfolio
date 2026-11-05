/**
 * Rizwan Baloch — Personal Portfolio Interactive Script
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. HEADER SCROLL, PROGRESS BAR & ACTIVE NAV SCROLL-SPY
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgress = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progressPercent}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 24);
    }

    // Active section scroll-spy
    let currentSectionId = 'home';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentSectionId}`);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. MOBILE-FRIENDLY NAVIGATION MENU
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  const closeMobileMenu = () => {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. INTERACTIVE SPOTLIGHT EFFECT ON CARDS
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     4. TERMINAL TYPEWRITER ANIMATION
     ========================================================================== */
  const typewriterElement = document.getElementById('typewriterText');
  const phrases = [
    'Full Stack & AI-Integrated Web Developer',
    'ACCP AI – 3-Year Diploma @ Aptech Computer Education',
    'Frontend: HTML5, CSS3, JavaScript, React.js, Tailwind CSS',
    'Backend: PHP, MySQL & REST API Integration',
    'Open to Remote, Freelance & Onsite Opportunities'
  ];

  if (typewriterElement) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tickTypewriter = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typewriterElement.textContent = currentPhrase.substring(0, charIndex);

      let delay = isDeleting ? 28 : 52;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(tickTypewriter, delay);
    };

    setTimeout(tickTypewriter, 1200);
  }

  /* ==========================================================================
     5. TECHNICAL SKILLS CATEGORY FILTER
     ========================================================================== */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      skillTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !matches);
      });
    });
  });

  /* ==========================================================================
     6. INTERACTIVE PROJECT CARDS & DETAIL MODAL
     ========================================================================== */
  const projectsData = {
    1: {
      number: 'Project 01',
      title: 'Advanced React Portfolio',
      technologies: ['React.js', 'JavaScript', 'CSS'],
      description:
        'A modern personal developer portfolio showcasing my skills, projects and professional profile.',
      liveUrl: 'https://rizwanchines.github.io/mynew_Advance_potfolio_by_react/',
      githubUrl: 'https://github.com/rizwanchines'
    },
    2: {
      number: 'Project 02',
      title: 'Handicrafts E-Commerce Website',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe'],
      description:
        'An e-commerce application designed to showcase and sell handicraft products.',
      liveUrl: null,
      githubUrl: 'https://github.com/rizwanchines'
    },
    3: {
      number: 'Project 03',
      title: 'Hospital Management System',
      technologies: ['.NET Core MVC', 'SQL Server', 'React.js', 'REST API'],
      description:
        'A hospital management application designed to organize healthcare-related operations and information.',
      liveUrl: null,
      githubUrl: 'https://github.com/rizwanchines'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const openProjectModal = (projectId) => {
    const project = projectsData[projectId];
    if (!project || !projectModal || !modalBody) return;

    const techBadges = project.technologies
      .map((tech) => `<span class="tech-pill">${tech}</span>`)
      .join('');

    const liveButton = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
           <span>Visit Live Portfolio</span>
         </a>`
      : '';

    modalBody.innerHTML = `
      <span class="section-eyebrow">${project.number}</span>
      <h3 id="modalTitle">${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tech-list">${techBadges}</div>
      <div class="modal-actions">
        ${liveButton}
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <span>View GitHub Profile</span>
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    const id = card.getAttribute('data-project-id');
    card.addEventListener('click', () => openProjectModal(id));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(id);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     7. CONTACT FORM INTERACTION (DIRECT EMAIL & WHATSAPP)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitEmailBtn = document.getElementById('submitEmailBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');

  const getFormValues = () => {
    const senderName = document.getElementById('senderName').value.trim();
    const senderEmail = document.getElementById('senderEmail').value.trim();
    const workType = document.getElementById('workType').value;
    const senderMessage = document.getElementById('senderMessage').value.trim();
    return { senderName, senderEmail, workType, senderMessage };
  };

  if (contactForm && formStatus) {
    // 1. Direct Email Submission via FormSubmit
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const { senderName, senderEmail, workType, senderMessage } = getFormValues();

      if (!senderName || !senderEmail || !senderMessage) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please complete your name, email, and message before sending.';
        return;
      }

      const formattedEmailBody = [
        `Hello Rizwan,`,
        ``,
        `Name: ${senderName}`,
        `Email: ${senderEmail}`,
        `Opportunity Type: ${workType}`,
        ``,
        `Message:`,
        senderMessage
      ].join('\n');

      const openGmailFallback = () => {
        const subject = encodeURIComponent(`Portfolio Inquiry (${workType}) from ${senderName}`);
        const body = encodeURIComponent(formattedEmailBody);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rrizochines7@gmail.com&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');

        formStatus.className = 'form-status visible';
        formStatus.textContent =
          'Gmail compose tab opened with your message addressed to rrizochines7@gmail.com! Click "Send" in Gmail to deliver it.';
        contactForm.reset();
      };

      // FormSubmit blocks file:// protocol; use direct Gmail Compose when opened as local HTML file
      if (window.location.protocol === 'file:') {
        openGmailFallback();
        return;
      }

      if (submitEmailBtn && submitBtnText) {
        submitEmailBtn.disabled = true;
        submitBtnText.textContent = 'Sending...';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/rrizochines7@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            opportunity_type: workType,
            message: senderMessage,
            _subject: `Portfolio Inquiry (${workType}) from ${senderName}`
          })
        });

        const result = await response.json();

        if (response.ok && result.success !== 'false') {
          formStatus.className = 'form-status visible';
          formStatus.textContent =
            'Message sent successfully to rrizochines7@gmail.com! Thank you for reaching out.';
          contactForm.reset();
        } else {
          openGmailFallback();
        }
      } catch {
        openGmailFallback();
      } finally {
        if (submitEmailBtn && submitBtnText) {
          submitEmailBtn.disabled = false;
          submitBtnText.textContent = 'Send Directly to Email';
        }
      }
    });

    // 2. Direct WhatsApp Message Button
    if (sendWhatsappBtn) {
      sendWhatsappBtn.addEventListener('click', () => {
        const { senderName, senderEmail, workType, senderMessage } = getFormValues();

        if (!senderName || !senderMessage) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please enter your name and message to send via WhatsApp.';
          return;
        }

        const whatsappText = [
          `Assalam-o-Alaikum Rizwan,`,
          ``,
          `*Name:* ${senderName}`,
          senderEmail ? `*Email:* ${senderEmail}` : null,
          `*Opportunity:* ${workType}`,
          ``,
          `*Message:*`,
          senderMessage
        ]
          .filter(Boolean)
          .join('\n');

        const whatsappUrl = `https://wa.me/923323005903?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        formStatus.className = 'form-status visible';
        formStatus.textContent = 'Opening WhatsApp chat with Rizwan (03323005903)...';
      });
    }
  }

  /* ==========================================================================
     8. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});

