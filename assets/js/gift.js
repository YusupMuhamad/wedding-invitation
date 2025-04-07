document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const numberToCopy = this.dataset.number;
            
            if (numberToCopy) {
                navigator.clipboard.writeText(numberToCopy)
                    .then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="material-icons">check</i>Tersalin!';
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy:', err);
                        alert('Gagal menyalin nomor rekening');
                    });
            }
        });
    });
});