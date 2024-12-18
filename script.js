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
    console.log('Theme button:', themeToggleBtn); // Debug line

    if (!themeToggleBtn) {
        console.error('Theme toggle button not found!');
        return;
    }

    const themeIcon = themeToggleBtn.querySelector('i');
    const html = document.documentElement;
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        console.log('Button clicked!'); // Debug line
        const currentTheme = html.getAttribute('data-theme');
        console.log('Current theme:', currentTheme); // Debug line
        
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        console.log('New theme:', newTheme); // Debug line
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

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

    // Updated Skills popup functionality
    const skillsButton = document.querySelector('.float-item:contains("Skills")') || 
                        document.querySelector('.float-item');
    
    // Create skills popup if button exists
    if (skillsButton) {
        console.log('Skills button found:', skillsButton); // Debug line

        const skillsPopup = document.createElement('div');
        skillsPopup.className = 'skills-popup';
        skillsPopup.innerHTML = `
            <div class="skills-category">
                <h3>Programming Languages</h3>
                <div class="skills-list">
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">Java</span>
                </div>
            </div>
            <div class="skills-category">
                <h3>Web Technologies</h3>
                <div class="skills-list">
                    <span class="skill-tag">HTML/CSS</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Node.js</span>
                </div>
            </div>
            <div class="skills-category">
                <h3>Tools & Frameworks</h3>
                <div class="skills-list">
                    <span class="skill-tag">Git</span>
                    <span class="skill-tag">Docker</span>
                    <span class="skill-tag">AWS</span>
                </div>
            </div>
        `;

        document.body.appendChild(skillsPopup);

        skillsButton.addEventListener('click', (e) => {
            console.log('Skills button clicked'); // Debug line
            const buttonRect = skillsButton.getBoundingClientRect();
            skillsPopup.style.top = `${buttonRect.top}px`;
            skillsPopup.style.left = `${buttonRect.right + 20}px`;
            skillsPopup.classList.toggle('active');
            e.stopPropagation();
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!skillsPopup.contains(e.target) && !skillsButton.contains(e.target)) {
                skillsPopup.classList.remove('active');
            }
        });
    } else {
        console.error('Skills button not found!'); // Debug line
    }
}); 