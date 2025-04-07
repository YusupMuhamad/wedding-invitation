document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const videoGrid = document.querySelector('.video-grid');

    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        videoGrid.classList.toggle('collapsed');
    });
});

// Wedding date - set this to your wedding date
const weddingDate = new Date('December 25, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = '<h2>Happy Wedding Day! 🎉</h2>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call