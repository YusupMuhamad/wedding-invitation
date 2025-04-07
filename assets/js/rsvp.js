document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const guestListContainer = document.getElementById('guestListContainer');
    
    // Load existing RSVPs
    function loadRSVPs() {
        const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
        updateStats(rsvps);
        displayGuestList(rsvps);
    }

    // Update attendance statistics
    function updateStats(rsvps) {
        const stats = rsvps.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
        }, {});

        document.getElementById('hadirCount').textContent = stats.hadir || 0;
        document.getElementById('tidakHadirCount').textContent = stats.tidak_hadir || 0;
        document.getElementById('raguCount').textContent = stats.ragu || 0;
    }

    // Display guest list
    function displayGuestList(rsvps) {
        guestListContainer.innerHTML = rsvps.map(rsvp => `
            <div class="guest-item">
                <span class="guest-name">${rsvp.name}</span>
                <span class="guest-status ${rsvp.status}">${getStatusText(rsvp.status)}</span>
            </div>
        `).join('');
    }

    // Convert status to display text
    function getStatusText(status) {
        const statusMap = {
            'hadir': 'Hadir',
            'tidak_hadir': 'Tidak Hadir',
            'ragu': 'Masih Ragu'
        };
        return statusMap[status];
    }

    // Handle form submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('guestName').value.trim();
        const status = document.getElementById('attendance').value;
        
        if (!name || !status) return;

        // Get existing RSVPs
        const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
        
        // Add new RSVP
        rsvps.unshift({
            name: name,
            status: status,
            date: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('rsvps', JSON.stringify(rsvps));
        
        // Reset form
        rsvpForm.reset();
        
        // Update display
        loadRSVPs();
    });

    // Initial load
    loadRSVPs();
});