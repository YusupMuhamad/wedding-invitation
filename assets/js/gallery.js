let currentImageIndex = 0;
const images = [
    'assets/img/photo1.jpg',
    'assets/img/prewed1.png',
    'assets/img/prewed2.png',
    'assets/img/couple-photo.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-img').src = images[currentImageIndex];
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

function changeImage(direction) {
    const img = document.getElementById('lightbox-img');
    img.classList.add('fade');
    
    setTimeout(() => {
        currentImageIndex += direction;
        if (currentImageIndex >= images.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = images.length - 1;
        img.src = images[currentImageIndex];
        
        // Remove fade class after image loads
        img.onload = () => {
            img.classList.remove('fade');
        };
    }, 300);
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    lightbox.style.display = 'block';
    img.src = images[currentImageIndex];
    document.body.style.overflow = 'hidden';
    
    // Ensure image is visible when opening
    img.classList.remove('fade');
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});