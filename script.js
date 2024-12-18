document.addEventListener('DOMContentLoaded', () => {
    const mindMapItems = document.querySelectorAll('.mind-map-item');
    const previewContainer = document.querySelector('.preview-container');

    mindMapItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            const previewSection = document.getElementById(section);
            
            // Hide all sections
            document.querySelectorAll('.preview-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            previewSection.classList.add('active');
            previewContainer.classList.add('active');
        });
    });

    // Close preview when clicking outside
    previewContainer.addEventListener('click', (e) => {
        if (e.target === previewContainer) {
            previewContainer.classList.remove('active');
        }
    });
}); 