document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- Navbar Background on Scroll ---
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 1)'; // Solid background
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.9)'; // Transparent with blur
        }
    });

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
        });
    });

    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        // Close if clicked outside the image
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    // --- Simple Scroll Reveal Animation ---
    const faders = document.querySelectorAll('.goal-card, .project-card, .about-content');
    
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.style.opacity = '0';
        fader.style.transform = 'translateY(20px)';
        fader.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appearOnScroll.observe(fader);
    });

});
