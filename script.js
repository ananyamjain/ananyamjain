document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const commandText = document.querySelector('.command-text');
    const terminal = document.querySelector('.terminal');
    
    // Only extra commands that users can input
    const commands = {
        'cat about.txt': generateAbout,
        'cat projects.txt': generateProjects,
        'cat achievements.txt': generateAchievements,
        'ls ./certificates/': generateCertificates,
        'clear': clearTerminal
    };
    
    // Keep input focused
    terminal.addEventListener('click', () => commandInput.focus());
    
    // Update visible text
    commandInput.addEventListener('input', () => {
        commandText.textContent = commandInput.value;
    });

    // Process commands
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            if (command) {
                addToTerminal('command', command);
                
                if (commands[command]) {
                    commands[command]();
                } else {
                    addToTerminal('error', 'Command not found. Check the cheatsheet for available commands.');
                }
            }
            
            commandInput.value = '';
            commandText.textContent = '';
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    function addToTerminal(type, content) {
        const line = document.createElement('div');
        line.className = 'line';
        
        if (type === 'command') {
            line.innerHTML = `<span class="prompt">$</span> <span class="command">${content}</span>`;
        } else {
            line.className = 'output';
            line.innerHTML = content;
        }
        
        terminalContent.insertBefore(line, document.querySelector('.command-input-container'));
    }

    // Extra command functions
    function generateAbout() {
        addToTerminal('output', `
            <div class="section">
                <h2>About Me</h2>
                <p>I'm passionate about building innovative solutions and exploring new technologies.</p>
                <p>Currently focused on AI, web development, and creating impactful user experiences.</p>
            </div>
        `);
    }

    function generateProjects() {
        addToTerminal('output', `
            <div class="section">
                <h2>Featured Projects</h2>
                <div class="project">
                    <h3>Project Name</h3>
                    <p>Description of the project and technologies used.</p>
                    <a href="#">View Project →</a>
                </div>
            </div>
        `);
    }

    function generateAchievements() {
        addToTerminal('output', `
            <div class="section">
                <h2>Achievements</h2>
                <ul>
                    <li>Dean's List - All Semesters</li>
                    <li>Hackathon Winner - Best Innovation</li>
                    <li>Department Excellence Award</li>
                </ul>
            </div>
        `);
    }

    function generateCertificates() {
        addToTerminal('output', `
            <div class="section">
                <h2>Certifications</h2>
                <ul>
                    <li>AWS Certified Developer</li>
                    <li>Google Cloud Professional</li>
                    <li>Microsoft Azure Fundamentals</li>
                </ul>
            </div>
        `);
    }

    function clearTerminal() {
        const elements = Array.from(terminalContent.children);
        elements.forEach(el => {
            if (!el.classList.contains('command-input-container')) {
                el.remove();
            }
        });
    }

    // Initial focus
    commandInput.focus();
}); 