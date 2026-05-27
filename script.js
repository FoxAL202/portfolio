// Smooth scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Navbar link active state
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? '#fff' : '';
    });
  });
});