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
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    // Parallax
    const sy = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      el.style.transform = `translateY(${sy * speed}px)`;
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

  // Initial parallax positions
  const sy0 = window.scrollY;
  parallaxEls.forEach(el => {
    el.style.transform = `translateY(${sy0 * parseFloat(el.dataset.parallax)}px)`;
  });

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

  // About photo placeholder
  const aboutImg = document.getElementById('aboutPhoto');
  const photoPlaceholder = document.getElementById('photoPlaceholder');
  if (aboutImg.complete) {
    photoPlaceholder.classList.add('hidden');
  } else {
    aboutImg.addEventListener('load', () => photoPlaceholder.classList.add('hidden'));
  }
  aboutImg.addEventListener('error', () => photoPlaceholder.classList.remove('hidden'));

  // Character counter
  const msgField = document.querySelector('.contact-form textarea');
  const charCount = document.getElementById('charCount');
  const updateCharCount = () => { charCount.textContent = msgField.value.length; };
  msgField.addEventListener('input', updateCharCount);

  // Contact form handler
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const orig = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    const res = await fetch(form.action + '?ajax=true', {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      btn.textContent = 'Отправлено!';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); updateCharCount(); }, 3000);
    } else {
      btn.textContent = 'Ошибка';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    }
  });
});