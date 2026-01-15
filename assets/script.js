document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu Toggle (digunakan di semua halaman) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Tutup mobile menu saat link di navbar diklik
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // --- Navbar Background on Scroll (digunakan di semua halaman) ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(15, 15, 15, 1)';
            } else {
                header.style.backgroundColor = 'rgba(15, 15, 15, 0.9)';
            }
        });
    }

    // --- Gallery Lightbox (digunakan di index.html & gallery.html) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item'); // Akan menemukan elemen di index & gallery
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox && galleryItems.length > 0 && closeLightbox) {
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
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }

    // --- Simple Scroll Reveal Animation (digunakan di semua halaman) ---
    // Gabungkan semua selector dari berbagai halaman
    const faders = document.querySelectorAll(
        '.goal-card, .news-card, .developer-card, .product-list-item, .gallery-item-page'
    );
    
    if (faders.length > 0) {
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
    }

});
