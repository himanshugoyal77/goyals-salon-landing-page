/**
 * SILK Hair Studio & Care Lab
 * Modern Responsive Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initShadeFilter();
  initServiceFilter();
  initShoppingBag();
  initTestimonialsSlider();
  initPhoneAppInteraction();
  initFaqAccordion();
  initNewsletter();
});

/* ==========================================================================
   1. Navigation & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Navbar Scroll State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open Drawer
  function openMobileMenu() {
    mobileDrawer?.classList.add('active');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Drawer
  function closeMobileMenu() {
    mobileDrawer?.classList.remove('active');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Smooth scroll with sticky offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   2. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   3. Interactive Hair Shade Studio
   ========================================================================== */
function initShadeFilter() {
  const tabs = document.querySelectorAll('.shade-tab-btn');
  const cards = document.querySelectorAll('.shade-card-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'bg-[#181514]', 'text-white');
        t.classList.add('bg-white', 'text-[#181514]');
      });

      tab.classList.remove('bg-white', 'text-[#181514]');
      tab.classList.add('active', 'bg-[#181514]', 'text-white');

      const filterValue = tab.getAttribute('data-shade');

      cards.forEach(card => {
        const cardShade = card.getAttribute('data-shade');
        if (filterValue === 'all' || cardShade === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Signature Services Filter & Instant Booking Bind
   ========================================================================== */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#181514]', 'text-white');
        b.classList.add('bg-[#FAF7F2]', 'text-[#6B635E]', 'border-[#E2D8CC]');
      });

      btn.classList.remove('bg-[#FAF7F2]', 'text-[#6B635E]', 'border-[#E2D8CC]');
      btn.classList.add('bg-[#181514]', 'text-white', 'border-[#181514]');

      const filter = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Quick Book triggers inside service cards smoothly scroll to #booking
  document.querySelectorAll('.book-service-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service-name');
      const targetEl = document.getElementById('booking');
      
      // Update app phone preview if matching
      const appSelectedService = document.getElementById('app-selected-service');
      if (appSelectedService && serviceName) {
        appSelectedService.textContent = serviceName;
      }
      
      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   5. Curated Care Shopping Bag & Quick Drawer
   ========================================================================== */
function initShoppingBag() {
  const bagOpenBtns = document.querySelectorAll('.open-bag-btn');
  const bagDrawer = document.getElementById('bag-drawer');
  const bagBackdrop = document.getElementById('bag-backdrop');
  const bagClose = document.getElementById('bag-close');
  const bagItemsContainer = document.getElementById('bag-items-list');
  const bagBadge = document.getElementById('bag-badge');
  const bagSubtotalEl = document.getElementById('bag-subtotal');
  const bagEmptyNotice = document.getElementById('bag-empty-notice');
  const checkoutBtn = document.getElementById('bag-checkout-btn');

  let cart = [
    {
      id: 'prod-1',
      title: 'No. 01 Silk Elixir Botanical Hair Oil',
      price: 54,
      image: 'assets/images/product-oil.jpg',
      size: '50ml',
      quantity: 1
    }
  ];

  function openBag() {
    bagDrawer?.classList.add('active');
    bagBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBag() {
    bagDrawer?.classList.remove('active');
    bagBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  bagOpenBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openBag();
  }));

  bagClose?.addEventListener('click', closeBag);
  bagBackdrop?.addEventListener('click', closeBag);

  function updateBagUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Badges
    if (bagBadge) {
      bagBadge.textContent = totalCount;
      bagBadge.classList.toggle('hidden', totalCount === 0);
    }
    
    // Update Subtotal
    if (bagSubtotalEl) {
      bagSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    if (bagEmptyNotice && bagItemsContainer) {
      if (cart.length === 0) {
        bagEmptyNotice.style.display = 'block';
        bagItemsContainer.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
      } else {
        bagEmptyNotice.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;
        
        bagItemsContainer.innerHTML = cart.map(item => `
          <div class="flex items-center gap-4 py-4 border-b border-[#E2D8CC]/60 text-left">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-xl border border-[#E2D8CC]/80 flex-shrink-0" />
            <div class="flex-grow min-w-0">
              <h4 class="font-serif font-semibold text-sm text-[#181514] truncate">${item.title}</h4>
              <p class="text-xs text-[#6B635E]">${item.size} • $${item.price}.00</p>
              <div class="flex items-center gap-2 mt-2">
                <button class="cart-qty-btn decrease-qty w-6 h-6 rounded-full border border-[#E2D8CC] flex items-center justify-center text-xs hover:bg-[#FAF7F2]" data-id="${item.id}">-</button>
                <span class="text-xs font-semibold px-1">${item.quantity}</span>
                <button class="cart-qty-btn increase-qty w-6 h-6 rounded-full border border-[#E2D8CC] flex items-center justify-center text-xs hover:bg-[#FAF7F2]" data-id="${item.id}">+</button>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="font-serif font-medium text-sm text-[#181514]">$${(item.price * item.quantity).toFixed(2)}</div>
              <button class="remove-cart-item text-[11px] text-[#9B3E32] hover:underline mt-2 inline-block" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `).join('');

        // Attach listeners for dynamic items
        bagItemsContainer.querySelectorAll('.increase-qty').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(p => p.id === id);
            if (item) {
              item.quantity += 1;
              updateBagUI();
            }
          });
        });

        bagItemsContainer.querySelectorAll('.decrease-qty').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(p => p.id === id);
            if (item) {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                cart = cart.filter(p => p.id !== id);
              }
              updateBagUI();
            }
          });
        });

        bagItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(p => p.id !== id);
            updateBagUI();
            showToast('Bag Updated', 'Item removed from your shopping bag', 'info');
          });
        });
      }
    }
  }

  // Attach Add to Bag from product cards
  document.querySelectorAll('.add-to-bag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-product-id');
      const title = btn.getAttribute('data-product-title');
      const price = parseFloat(btn.getAttribute('data-product-price')) || 50;
      const image = btn.getAttribute('data-product-image') || 'assets/images/product-oil.jpg';
      const size = btn.getAttribute('data-product-size') || 'Standard';

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, title, price, image, size, quantity: 1 });
      }

      updateBagUI();
      openBag();
      showToast('Added to Bag', `1x ${title}`, 'success');
    });
  });

  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    showToast('Order Reserved', 'Thank you! Curated order confirmation has been initiated.', 'success');
    setTimeout(() => {
      cart = [];
      updateBagUI();
      closeBag();
    }, 1800);
  });

  // Initial draw
  updateBagUI();
}

/* ==========================================================================
   6. Testimonials Carousel / Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  const dots = document.querySelectorAll('.testi-dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.remove('bg-[#E2D8CC]', 'w-2.5');
        dot.classList.add('bg-[#181514]', 'w-8');
      } else {
        dot.classList.remove('bg-[#181514]', 'w-8');
        dot.classList.add('bg-[#E2D8CC]', 'w-2.5');
      }
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  prevBtn?.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide-to'), 10);
      goToSlide(idx);
      startAutoplay();
    });
  });

  track.parentElement?.addEventListener('mouseenter', stopAutoplay);
  track.parentElement?.addEventListener('mouseleave', startAutoplay);

  // Swipe for touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentIndex - 1);
    }
  }, { passive: true });

  goToSlide(0);
  startAutoplay();
}

/* ==========================================================================
   7. Interactive Goyals Salon Mobile App Mockup Controller
   ========================================================================== */
function initPhoneAppInteraction() {
  const slotBtns = document.querySelectorAll('.app-slot-btn');
  const serviceChips = document.querySelectorAll('.app-service-chip');
  const appBookBtn = document.getElementById('app-confirm-booking-btn');
  const appConfirmBanner = document.getElementById('app-confirm-banner');
  const appSelectedService = document.getElementById('app-selected-service');
  const appSelectedTime = document.getElementById('app-selected-time');

  // Interactive Time Slot Selection inside Phone
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => {
        b.classList.remove('bg-[#C59B6D]', 'text-[#181514]', 'font-bold');
        b.classList.add('bg-white/10', 'text-white/80');
      });
      btn.classList.remove('bg-white/10', 'text-white/80');
      btn.classList.add('bg-[#C59B6D]', 'text-[#181514]', 'font-bold');

      const time = btn.getAttribute('data-time');
      if (appSelectedTime && time) {
        appSelectedTime.textContent = time;
      }
    });
  });

  // Interactive Service Chips inside Phone
  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      serviceChips.forEach(c => {
        c.classList.remove('border-[#C59B6D]', 'text-[#C59B6D]', 'bg-[#C59B6D]/15');
        c.classList.add('border-white/10', 'text-white/60');
      });
      chip.classList.remove('border-white/10', 'text-white/60');
      chip.classList.add('border-[#C59B6D]', 'text-[#C59B6D]', 'bg-[#C59B6D]/15');

      const service = chip.getAttribute('data-service');
      if (appSelectedService && service) {
        appSelectedService.textContent = service;
      }
    });
  });

  // Instant In-App Booking Button
  appBookBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (appConfirmBanner) {
      appConfirmBanner.classList.remove('hidden');
      appBookBtn.textContent = '✓ Booking Confirmed in App';
      appBookBtn.classList.add('bg-[#4E8062]', 'text-white');
      showToast('Goyals Salon App', 'Your private salon appointment has been reserved!', 'success');

      setTimeout(() => {
        appConfirmBanner.classList.add('hidden');
        appBookBtn.textContent = 'Reserve in Goyals App';
        appBookBtn.classList.remove('bg-[#4E8062]', 'text-white');
      }, 4500);
    }
  });
}

// Global ESC key listener to close drawer if open
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('mobile-drawer')?.classList.remove('active');
    document.getElementById('mobile-drawer-backdrop')?.classList.remove('active');
    document.getElementById('bag-drawer')?.classList.remove('active');
    document.getElementById('bag-backdrop')?.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    trigger?.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');

      // Close all
      items.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.accordion-content');
        const otherIcon = otherItem.querySelector('.accordion-icon');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        
        otherContent?.classList.remove('open');
        otherIcon?.classList.remove('rotated');
        otherTrigger?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        content.classList.add('open');
        icon?.classList.add('rotated');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   9. Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value.trim();

      if (!email || !email.includes('@')) {
        showToast('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
      }

      input.value = '';
      showToast('Welcome to the Silk Circle', 'Enjoy 15% off with code SILK15 sent to your inbox.', 'success');
    });
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(title, message, type = 'info') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#181514] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3 pointer-events-auto transition-transform duration-300';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'success' 
    ? `<svg class="w-5 h-5 text-[#C59B6D] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    : `<svg class="w-5 h-5 text-[#9B3E32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-grow min-w-0">
      <h5 class="text-xs font-semibold uppercase tracking-wider text-[#C59B6D]">${title}</h5>
      <p class="text-xs text-white/80 mt-0.5 leading-snug">${message}</p>
    </div>
    <button class="text-white/40 hover:text-white text-xs ml-2" onclick="this.parentElement.classList.remove('show')">✕</button>
  `;

  toast.classList.add('show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
