document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if(toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon Animation
            const icon = toggleBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. TAB INTERACTION (Bestsellers) ---
    const tabs = document.querySelectorAll('.filter-tabs button');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });


    // --- 3. PREMIUM SCROLL ANIMATIONS ---
    
    // Config: When 15% of the element is visible, trigger animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that forces opacity: 1 and transform: 0
                entry.target.classList.add('is-visible');
                // Stop watching once animated
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Helper function to prepare elements for animation
    const setupAnimation = (elements, animationClass, staggerDelay = 0) => {
        if(!elements) return;

        // Convert single element to array if needed
        const elArray = (elements instanceof NodeList || Array.isArray(elements)) ? elements : [elements];

        elArray.forEach((el, index) => {
            // Add the base CSS class (starts hidden)
            el.classList.add(animationClass);
            
            // Add stagger delay (e.g., 1st item 0ms, 2nd 150ms, 3rd 300ms...)
            if (staggerDelay > 0) {
                el.style.transitionDelay = `${index * staggerDelay}ms`;
            }
            
            // Start watching
            scrollObserver.observe(el);
        });
    };

    // --- APPLY ANIMATIONS TO SECTIONS ---

    // A. Hero Section (Text Staggered)
    const heroTextElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .btn');
    setupAnimation(heroTextElements, 'animate-fade-up', 200); // 200ms delay between each

    // B. Hero Image (Scale Effect)
    const heroImage = document.querySelector('.hero-right img');
    if (heroImage) setupAnimation(heroImage, 'animate-scale');

    // C. USP Bar (Icons popping up)
    const uspItems = document.querySelectorAll('.usp-item');
    setupAnimation(uspItems, 'animate-fade-up', 150);

    // D. Bestsellers Section
    // 1. Title & Tabs (Fade up together)
    const bestsellerHeader = document.querySelectorAll('.bestsellers .section-title, .bestsellers .filter-tabs');
    setupAnimation(bestsellerHeader, 'animate-fade-up', 100);

    // 2. Product Cards (Staggered flow)
    const productCards = document.querySelectorAll('.product-card');
    setupAnimation(productCards, 'animate-fade-up', 150); // Cards appear one by one

    // E. General Section Titles (For the rest of the page)
    const sectionTitles = document.querySelectorAll('.section-title:not(.bestsellers .section-title)');
    setupAnimation(sectionTitles, 'animate-fade-up');

});