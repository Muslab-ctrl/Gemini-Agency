document.addEventListener("DOMContentLoaded", function () {
  // Loader
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

  // Nasconde loader e inizializza Locomotive
  setTimeout(() => {
    loader.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-500");
    setTimeout(() => {
      loader.style.display = "none";

      // Inizializzazione Locomotive Scroll SOLO dopo loader
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
      });

      setupScrollFeatures(scroll); // tutto il resto dentro qui sotto

    }, 500);
  }, 2000);

  // === TUTTO IL RESTO QUI DENTRO ===
  function setupScrollFeatures(scroll) {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobile = document.getElementById('closeMobile');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Cambia stile navbar
    scroll.on('scroll', (instance) => {
      if (instance.scroll.y > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    closeMobile.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Link attivo
    function setActiveNav(target) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`[data-nav="${target}"]`);
      if (activeLink) activeLink.classList.add('active');
    }

    function setupNavigation(links) {
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('href').substring(1);
          const element = document.getElementById(target);
          if (element) {
            scroll.scrollTo(element);
            setActiveNav(target);
            if (mobileMenu.classList.contains('open')) {
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

    // Contatori numerici
    function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const isPercentage = counter.textContent.includes('%');
        const isPlus = counter.textContent.includes('+');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            let suffix = isPercentage ? '%' : (isPlus ? '+' : '');
            counter.textContent = target + suffix;
            clearInterval(timer);
          } else {
            let suffix = isPercentage ? '%' : (isPlus ? '+' : '');
            counter.textContent = Math.ceil(current) + suffix;
          }
        }, 40);
      });
    }

    // Nuova variabile per animare i contatori una volta sola
    let countersAnimated = false;

    scroll.on('scroll', () => {
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

    // Hover sulle card
    document.querySelectorAll('.card-hover').forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(253, 114, 36, 0.15)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });

    // Resize
    window.addEventListener('resize', () => {
      scroll.update();
    });
  }
});
