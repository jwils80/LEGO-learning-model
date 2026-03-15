/**
 * LEGO Learning Model - Interactions
 * Lightweight vanilla JavaScript to handle:
 * 1. Scroll Reading Progress
 * 2. Layered Scroll Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Reading Progress Bar ---
    const progressBar = document.getElementById('progress-bar');
    
    const updateProgress = () => {
        // Calculate how far down the user has scrolled
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update bar width
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    };

    // --- 2. Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.reveal');
    const insightBlocks = document.querySelectorAll('.insight-block');
    const findingCards = document.querySelectorAll('.finding-card');

    // Add staggered child animations for grids so they reveal sequentially
    const addStaggerClasses = () => {
        // Force evaluation so they act as triggers themselves
        insightBlocks.forEach(el => el.classList.add('reveal'));
        findingCards.forEach(el => el.classList.add('reveal'));
    };
    
    addStaggerClasses();
    
    // Re-select all elements including the ones just added
    const allReveals = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        const windowHeight = window.innerHeight;
        // Trigger point: reveal slightly before the element enters the viewport bottom
        const elementVisible = 100;

        allReveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // --- 3. Event Listeners ---
    
    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                checkReveal();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize state on load
    updateProgress();
    // Small delay on initial load reveal to allow CSS to paint first
    setTimeout(checkReveal, 100);
});
