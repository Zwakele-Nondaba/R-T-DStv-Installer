// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Close nav on link click (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Back-to-top button behavior
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  toTop.classList.toggle('show', y > 800);
});
toTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer reveal animations
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth scroll enhancement (for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Simple form validation + fake submit handler
const form = document.getElementById('quoteForm');
const toast = form?.querySelector('.toast');

function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validatePhone(v){ return /^[0-9 +()-]{7,}$/.test(v); }

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    const result = await response.text();

    if(result.trim() === "success"){
      showToast("✅ Thank you! Your request has been sent.");
      form.reset();
    } else {
      showToast("❌ Something went wrong. Please try again.");
    }
  } catch (err) {
    showToast("⚠️ Error sending request.");
  }
});


function markInvalid(input){
  const field = input.closest('.field');
  field?.classList.add('invalid');
}

function showToast(msg){
  if (!toast) return;
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.right = '16px';
  toast.style.bottom = '16px';
  toast.style.background = 'linear-gradient(90deg, #4fd1c5, #6a7dff)';
  toast.style.color = '#0a0f18';
  toast.style.padding = '12px 14px';
  toast.style.borderRadius = '14px';
  toast.style.boxShadow = '0 10px 24px rgba(0,0,0,.35)';
  toast.style.fontWeight = '700';
  toast.style.zIndex = '60';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(6px)';
  toast.style.transition = 'opacity .2s ease, transform .2s ease';
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
    }, 2800);
  });
}

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    
    // Wait a little before fading out (makes it look smoother)
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000); // match fade-out transition
    }, 1200); // visible at least 1.2s
  });