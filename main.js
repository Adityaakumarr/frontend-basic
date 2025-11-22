document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const mainText = "I Love You";
    const messages = [
        "You are my favorite notification. 🔔",
        "My heart does buffering only for you. ⏳",
        "If kisses were code, you’d be my infinite loop. ♾️",
        "You're the CSS that styles my soul. 🎨",
        "You're the semi-colon to my code; essential. ;)",
        "Are you a keyboard? Because you're my type. ⌨️",
        "My love for you is like Pi... never ending. 🥧",
        "You make my dopamine levels go 📈",
        "404 Error: Someone as cute as you not found anywhere else."
    ];

    // --- Elements ---
    const typewriterElement = document.getElementById('typewriter-text');
    const subtitleElement = document.getElementById('subtitle');
    const loveBtn = document.getElementById('love-btn');
    const messageContainer = document.getElementById('message-container');
    const cursorFollower = document.getElementById('cursor-follower');
    const backgroundContainer = document.getElementById('background-container');

    // --- Typewriter Effect ---
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < mainText.length) {
            typewriterElement.innerHTML += mainText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 150); // Typing speed
        } else {
            // After typing finishes, show subtitle
            setTimeout(() => {
                subtitleElement.classList.remove('hidden');
                subtitleElement.classList.add('visible');
            }, 500);
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 800);

    // --- Button Interaction ---
    loveBtn.addEventListener('click', (e) => {
        // 1. Random Message
        const randomIndex = Math.floor(Math.random() * messages.length);
        const message = messages[randomIndex];

        // Animate out old message if exists
        messageContainer.innerHTML = `<span class="message-anim">${message}</span>`;

        // 2. Confetti Explosion
        triggerConfetti();

        // 3. Button Wiggle/Pop effect (handled by CSS active state, but let's add extra JS juice if needed)
        createFloatingHeart(e.clientX, e.clientY);
    });

    function triggerConfetti() {
        // Using canvas-confetti library
        if (typeof confetti === 'function') {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    }

    // --- Cursor Follower ---
    document.addEventListener('mousemove', (e) => {
        // Simple follow with slight delay is handled by CSS transition
        // We just update position
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // --- Background Floating Hearts ---
    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';

        // Randomize position and animation
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // 10-20s
        const size = Math.random() * 20 + 10; // 10-30px

        heart.style.left = `${startLeft}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;

        backgroundContainer.appendChild(heart);

        // Cleanup
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create hearts periodically
    setInterval(createBackgroundHeart, 800);

    // Create initial batch
    for (let i = 0; i < 10; i++) {
        setTimeout(createBackgroundHeart, Math.random() * 3000);
    }

    // --- Click Heart Effect ---
    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1s ease-out';
        heart.style.zIndex = '1000';

        document.body.appendChild(heart);

        // Animate
        requestAnimationFrame(() => {
            heart.style.transform = `translate(${Math.random() * 100 - 50}px, -100px) rotate(${Math.random() * 90 - 45}deg)`;
            heart.style.opacity = '0';
        });

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});
