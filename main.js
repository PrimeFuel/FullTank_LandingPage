document.addEventListener('DOMContentLoaded', () => {

    //  1. NAVBAR SCROLL EFFECT 
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    //  2. HAMBURGER / DRAWER 
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('navDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');

    const openDrawer = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawerOverlay?.addEventListener('click', closeDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    // Close drawer on nav link click
    document.querySelectorAll('.drawer-nav-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    //  3. SMOOTH SCROLL FOR ANCHOR LINKS 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    //  4. FAQ ACCORDION 
    document.querySelectorAll('.faq-item').forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const body = item.querySelector('.faq-body');

        trigger?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            document.querySelectorAll('.faq-item.open').forEach(other => {
                other.classList.remove('open');
                other.querySelector('.faq-body')?.classList.remove('open');
                other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                body?.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    //  5. PRICING TOGGLE 
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const monthPrices = document.querySelectorAll('.price-monthly');
    const yearPrices = document.querySelectorAll('.price-yearly');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const isYearly = btn.dataset.period === 'yearly';
            monthPrices.forEach(p => p.style.display = isYearly ? 'none' : '');
            yearPrices.forEach(p => p.style.display = isYearly ? '' : 'none');
        });
    });

    //  6. INTERSECTION OBSERVER (fade-in) 
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));

    //  7. COUNTER ANIMATION 
    const counters = document.querySelectorAll('.metric-number[data-target]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1800;
            const step = 16;
            const steps = duration / step;
            let current = 0;

            const timer = setInterval(() => {
                current += target / steps;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
                el.textContent = prefix + display + suffix;
            }, step);

            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));

    //  8. SCROLL TO TOP 
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //  9. NAVBAR ACTIVE LINK 
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => activeObserver.observe(s));
