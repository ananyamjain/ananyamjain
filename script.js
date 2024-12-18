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
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Modal Functionality for each floating item
    const skillsItem = document.querySelector('.float-item:nth-child(1)'); // Skills
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