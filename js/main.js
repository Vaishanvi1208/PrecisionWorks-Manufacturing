/* ==========================================================================
   PrecisionWorks Manufacturing — Main JavaScript
   Features: Sticky header, mobile nav, scroll reveal, form validation,
             smooth scroll, back-to-top, GA4 placeholder events
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DOM REFERENCES
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  const backToTopBtn = document.getElementById('backToTop');
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');


  /* --------------------------------------------------------------------------
     2. STICKY HEADER
     Adds a solid background + shadow when user scrolls past 80px.
     -------------------------------------------------------------------------- */
  function handleHeaderScroll() {
    if (!header) return;
    const scrollY = window.scrollY || window.pageYOffset;
    header.classList.toggle('header--scrolled', scrollY > 80);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  // Run on load in case page is already scrolled (e.g. after refresh)
  handleHeaderScroll();


  /* --------------------------------------------------------------------------
     3. MOBILE NAVIGATION
     Hamburger toggle, overlay click-to-close, link click-to-close.
     -------------------------------------------------------------------------- */
  function openMobileNav() {
    mainNav.classList.add('header__nav--open');
    menuToggle.classList.add('header__menu-toggle--active');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (navOverlay) navOverlay.classList.add('header__nav-overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mainNav.classList.remove('header__nav--open');
    menuToggle.classList.remove('header__menu-toggle--active');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.classList.remove('header__nav-overlay--visible');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.contains('header__nav--open');
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  // Close mobile nav when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when a nav link is clicked
  document.querySelectorAll('.header__nav-link, .header__cta').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('header__nav--open')) {
      closeMobileNav();
      menuToggle.focus();
    }
  });


  /* --------------------------------------------------------------------------
     4. SMOOTH SCROLL
     All anchor links with href starting with "#" smoothly scroll to target.
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
    });
  });


  /* --------------------------------------------------------------------------
     5. SCROLL REVEAL (Intersection Observer)
     Elements with class "reveal" fade in when they enter the viewport.
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      revealElements.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();


  /* --------------------------------------------------------------------------
     6. BACK-TO-TOP BUTTON
     Shows after scrolling 600px; clicks scroll to the top.
     -------------------------------------------------------------------------- */
  function handleBackToTop() {
    if (!backToTopBtn) return;
    const scrollY = window.scrollY || window.pageYOffset;
    backToTopBtn.classList.toggle('back-to-top--visible', scrollY > 600);
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION
     Client-side validation with inline error messages.
     -------------------------------------------------------------------------- */

  /**
   * Validates an email address format.
   * @param {string} email - The email string to validate.
   * @returns {boolean} True if valid.
   */
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Validates a phone number (loose check: allows +, digits, spaces, dashes, parens).
   * Returns true for empty strings (phone is optional).
   * @param {string} phone - The phone string to validate.
   * @returns {boolean} True if valid or empty.
   */
  function isValidPhone(phone) {
    if (!phone.trim()) return true; // Optional field
    var re = /^[\+]?[\d\s\-\(\)]{7,20}$/;
    return re.test(phone.trim());
  }

  /**
   * Shows an inline error for a form field.
   * @param {HTMLElement} input - The input element.
   * @param {string} errorId - The ID of the error span.
   */
  function showFieldError(input, errorId) {
    input.classList.add('form__input--error', 'form__select--error', 'form__textarea--error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('form__error--visible');
  }

  /**
   * Clears an inline error for a form field.
   * @param {HTMLElement} input - The input element.
   * @param {string} errorId - The ID of the error span.
   */
  function clearFieldError(input, errorId) {
    input.classList.remove('form__input--error', 'form__select--error', 'form__textarea--error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.remove('form__error--visible');
  }

  /**
   * Validates the entire quote form.
   * @returns {boolean} True if all required fields are valid.
   */
  function validateForm() {
    var isValid = true;

    // Name (required)
    var nameInput = document.getElementById('formName');
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'formNameError');
      isValid = false;
    } else {
      clearFieldError(nameInput, 'formNameError');
    }

    // Email (required, format)
    var emailInput = document.getElementById('formEmail');
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      showFieldError(emailInput, 'formEmailError');
      isValid = false;
    } else {
      clearFieldError(emailInput, 'formEmailError');
    }

    // Phone (optional, but validate format if provided)
    var phoneInput = document.getElementById('formPhone');
    if (!isValidPhone(phoneInput.value)) {
      showFieldError(phoneInput, 'formPhoneError');
      isValid = false;
    } else {
      clearFieldError(phoneInput, 'formPhoneError');
    }

    // Product interest (required)
    var productSelect = document.getElementById('formProduct');
    if (!productSelect.value) {
      showFieldError(productSelect, 'formProductError');
      isValid = false;
    } else {
      clearFieldError(productSelect, 'formProductError');
    }

    // Message (required)
    var messageInput = document.getElementById('formMessage');
    if (!messageInput.value.trim()) {
      showFieldError(messageInput, 'formMessageError');
      isValid = false;
    } else {
      clearFieldError(messageInput, 'formMessageError');
    }

    // GDPR consent (required)
    var consentCheckbox = document.getElementById('formConsent');
    var consentError = document.getElementById('formConsentError');
    if (!consentCheckbox.checked) {
      if (consentError) consentError.classList.add('form__error--visible');
      isValid = false;
    } else {
      if (consentError) consentError.classList.remove('form__error--visible');
    }

    return isValid;
  }

  // Real-time validation: clear error on input/change
  var formFields = [
    { id: 'formName', errorId: 'formNameError', event: 'input' },
    { id: 'formEmail', errorId: 'formEmailError', event: 'input' },
    { id: 'formPhone', errorId: 'formPhoneError', event: 'input' },
    { id: 'formProduct', errorId: 'formProductError', event: 'change' },
    { id: 'formMessage', errorId: 'formMessageError', event: 'input' }
  ];

  formFields.forEach(function (field) {
    var el = document.getElementById(field.id);
    if (el) {
      el.addEventListener(field.event, function () {
        clearFieldError(el, field.errorId);
      });
    }
  });

  // Clear consent error on change
  var consentCheckbox = document.getElementById('formConsent');
  if (consentCheckbox) {
    consentCheckbox.addEventListener('change', function () {
      var consentError = document.getElementById('formConsentError');
      if (consentError) consentError.classList.remove('form__error--visible');
    });
  }

  // Handle form submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) {
        // Focus the first invalid field for accessibility
        var firstError = quoteForm.querySelector('.form__input--error, .form__select--error, .form__textarea--error');
        if (firstError) firstError.focus();
        return;
      }

      // Gather form data (for future backend integration)
      var formData = {
        name: document.getElementById('formName').value.trim(),
        company: document.getElementById('formCompany').value.trim(),
        email: document.getElementById('formEmail').value.trim(),
        phone: document.getElementById('formPhone').value.trim(),
        product: document.getElementById('formProduct').value,
        message: document.getElementById('formMessage').value.trim(),
        consent: document.getElementById('formConsent').checked,
        timestamp: new Date().toISOString()
      };

      // Log form data (replace with actual API call in production)
      console.log('[PrecisionWorks] Quote request submitted:', formData);

      // GA4 conversion event placeholder
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'Quote Request',
          event_label: formData.product,
          value: 1
        });
      }

      // Show success state
      quoteForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('form__success--visible');

      // Reset form for future use
      quoteForm.reset();
    });
  }


  /* --------------------------------------------------------------------------
     8. HERO STATS COUNTER ANIMATION
     Animates numbers from 0 to their target value when visible.
     -------------------------------------------------------------------------- */
  function animateCounter(element, target, suffix, duration) {
    var start = 0;
    var startTime = null;

    // Parse numeric value from target
    var numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    if (isNaN(numericTarget)) return;

    // Determine prefix (e.g. "±")
    var prefix = '';
    if (target.startsWith('±')) prefix = '±';
    if (target.startsWith('+')) prefix = '+';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * numericTarget);

      // Format display
      var display = prefix + current.toLocaleString() + suffix;
      element.textContent = display;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure final value is exact
        element.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounterAnimation() {
    var statNumbers = document.querySelectorAll('.hero__stat-number');
    if (!statNumbers.length) return;

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var text = el.textContent.trim();

            // Extract suffix (e.g. "+", "K+", '"')
            var suffix = '';
            if (text.includes('K+')) suffix = 'K+';
            else if (text.endsWith('+')) suffix = '+';
            else if (text.endsWith('"')) suffix = '"';

            animateCounter(el, text, suffix, 2000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  initCounterAnimation();


  /* --------------------------------------------------------------------------
     9. ACTIVE NAV LINK HIGHLIGHTING
     Updates the active nav link based on current scroll position.
     -------------------------------------------------------------------------- */
  function highlightActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.header__nav-link');
    var scrollY = window.scrollY || window.pageYOffset;
    var headerHeight = header ? header.offsetHeight : 0;

    var currentSection = '';

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - headerHeight - 100;
      var sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('header__nav-link--active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('header__nav-link--active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });


  /* --------------------------------------------------------------------------
     10. PRELOAD CRITICAL RESOURCES
     After DOM is fully loaded, handle any deferred tasks.
     -------------------------------------------------------------------------- */
  window.addEventListener('load', function () {
    // Remove any loading states if present
    document.body.classList.add('loaded');

    // Re-run scroll-based functions in case of cached scroll position
    handleHeaderScroll();
    handleBackToTop();
    highlightActiveNav();
  });

})();
