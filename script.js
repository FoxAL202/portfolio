document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          fill.style.setProperty('--width', fill.dataset.width + '%');
          fill.classList.add('animated');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .skill-card, .project-card, .service-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Navbar active link
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const scrollIndicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollable) * 100;
    scrollProgress.style.width = scrolled + '%';

    // Navbar background
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);

    // Scroll indicator hide
    if (window.scrollY > 10) {
      if (!scrollIndicator.classList.contains('hiding')) {
        scrollIndicator.classList.add('hiding');
      }
    } else {
      scrollIndicator.classList.remove('hiding');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Typing effect
  const texts = [
    'Веб-разработчик',
    'Создаю сайты',
    'Пишу на Python',
    'Делаю Telegram ботов'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingText = document.getElementById('typingText');

  function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
      return;
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  typeEffect();

  // Particles
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particlesContainer.appendChild(particle);
  }

  // Animated counters
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
            return;
          }
          el.textContent = current;
        }, 30);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  // Custom cursor
  const cursor = document.querySelector('.cursor-follower');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Contact form handler
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Отправлено!';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = 'Отправить';
      btn.style.pointerEvents = 'auto';
      form.reset();
    }, 3000);
  });
});