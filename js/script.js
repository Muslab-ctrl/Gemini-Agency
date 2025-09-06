document.addEventListener("DOMContentLoaded", function () {
  // === LOADER ===
  const loader = document.getElementById("loading");
  const loaderText = document.getElementById("loader-text");
  const loaderIcon = document.getElementById("loader-icon");

  const loadingData = [
    { text: "CREATIVITÀ", icon: "../assets/creativita.svg" },
    { text: "STRATEGIA", icon: "../assets/strategia.svg" },
    { text: "CRESCITA", icon: "../assets/crescita.svg" }
  ];

  let index = 0;
  const interval = setInterval(() => {
    index++;
    if (index >= loadingData.length) {
      clearInterval(interval);
      return;
    }
    loaderText.textContent = loadingData[index].text;
    loaderIcon.src = loadingData[index].icon;
  }, 650);

  setTimeout(() => {
    loader.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-500");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  // === NAVBAR & MOBILE MENU ===
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobile = document.getElementById('closeMobile');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
      backToTopBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    }
  });

  // Mobile Menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  closeMobile?.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });

  function setupNavigation(links) {
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (mobileMenu?.classList.contains('open')) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }
  setupNavigation(navLinks);
  setupNavigation(mobileNavLinks);

  // Counter Animation
  let countersAnimated = false;
  window.addEventListener('scroll', () => {
    if (countersAnimated) return;
    const counters = document.querySelectorAll('.counter');
    for (let counter of counters) {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersAnimated = true;
        animateCounters();
        break;
      }
    }
  });

  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const isPercentage = counter.textContent.includes('%');
      const isPlus = counter.textContent.includes('+');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + (isPercentage ? '%' : (isPlus ? '+' : ''));
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current) + (isPercentage ? '%' : (isPlus ? '+' : ''));
        }
      }, 40);
    });
  }

  // Hover effects
  document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px rgba(253, 114, 36, 0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // Tab system
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(targetTab)?.classList.add('active');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const faqContent = faqItem.querySelector('.faq-content');
      const icon = this.querySelector('svg');

      document.querySelectorAll('.faq-trigger').forEach(other => {
        if (other !== trigger) {
          const otherContent = other.parentElement.querySelector('.faq-content');
          const otherIcon = other.querySelector('svg');
          otherContent.classList.remove('open');
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (faqContent.classList.contains('open')) {
        faqContent.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
      } else {
        faqContent.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top
  const backToTopBtn = document.getElementById('back-to-top');
  backToTopBtn?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // CTA ripple effect
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Ripple CSS
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Portfolio item hover
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    item.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.querySelector('.portfolio-overlay').style.opacity = '0';
    });
  });

  // Floating shapes
  const shapes = document.querySelectorAll(".floating-shapes .shape");
  shapes.forEach(shape => {
    shape.style.top = `${Math.random() * 90}%`;
    shape.style.left = `${Math.random() * 90}%`;
    shape.style.right = 'auto';
    shape.style.animationDelay = `${Math.random() * 4}s`;
  });

  // Service card animation (on load)
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});
