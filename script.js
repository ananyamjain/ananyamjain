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

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    themeToggleBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Modal Functionality
    const skillsItem = document.querySelector('.float-item');
    const modal = document.getElementById('skills-modal');
    const closeModal = document.querySelector('.close-modal');

    skillsItem.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}); 