document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plyr
    const player = new Plyr('#mainVideo', {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'pip',
            'fullscreen'
        ],
        settings: ['quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        tooltips: { controls: true, seek: true },
        keyboard: { focused: true, global: true }
    });

    // Get video ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    
    // Video data mapping
    const videoData = {
        '1': {
            title: 'Bersama Si Cantik',
            source: 'assets/video/video4.mp4',
            description: 'Beberapa moemen menyenangkan saat bersama sama di beberapa lokasi.'
        },
        '2': {
            title: 'Momen Saat Jalan Jalan ke Kamojanggg',
            source: 'assets/video/video3.mp4',
            description: 'Menghabiskan waktu bersama di Kamojag, menikmati keindahan alam dan moment berharga.'
        }
    };
    
    // Update video content
    if (videoId && videoData[videoId]) {
        const data = videoData[videoId];
        document.querySelector('.video-title').textContent = data.title;
        document.querySelector('.video-description p').textContent = data.description;
        
        // Update source and reload for Plyr
        const source = document.querySelector('#mainVideo source');
        source.src = data.source;
        player.source = {
            type: 'video',
            sources: [{
                src: data.source,
                type: 'video/mp4'
            }]
        };
    }

    // Comments functionality
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.querySelector('.comments-container');

    // Load existing comments
    function loadComments() {
        try {
            // Pastikan hanya memuat komentar untuk video yang sedang ditonton
            if (!videoId) return;
            
            const comments = JSON.parse(localStorage.getItem(`comments_video_${videoId}`)) || [];
            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="commenter-name">${comment.name}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading comments:', error);
            localStorage.setItem(`comments_video_${videoId}`, '[]');
        }
    }

    // Handle comment submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pastikan ada videoId sebelum menyimpan komentar
        if (!videoId) {
            alert('Video tidak ditemukan');
            return;
        }
        
        const name = document.getElementById('commenterName').value.trim();
        const text = document.getElementById('commentText').value.trim();
        
        if (!name || !text) return;

        try {
            // Get existing comments untuk video spesifik
            let comments = JSON.parse(localStorage.getItem(`comments_video_${videoId}`)) || [];
            
            // Add new comment
            comments.unshift({
                name: name,
                text: text,
                date: new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });
            
            // Save to localStorage dengan key yang spesifik untuk video ini
            localStorage.setItem(`comments_video_${videoId}`, JSON.stringify(comments));
            
            // Reset form
            commentForm.reset();
            
            // Reload comments
            loadComments();
        } catch (error) {
            console.error('Error saving comment:', error);
            alert('Maaf, terjadi kesalahan saat menyimpan komentar.');
        }
    });

    // Load comments when page loads
    loadComments();
});