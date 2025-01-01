document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const commandText = document.querySelector('.command-text');
    const terminal = document.querySelector('.terminal');
    
    // Clear any existing content first
    while (terminalContent.firstChild) {
        terminalContent.removeChild(terminalContent.firstChild);
    }

    // Add command input container back
    const commandInputContainer = document.createElement('div');
    commandInputContainer.className = 'command-input-container';
    commandInputContainer.innerHTML = `
        <span class="prompt">$</span>
        <span class="command-text"></span>
        <span class="cursor">▋</span>
        <input type="text" class="command-input" autofocus>
    `;
    terminalContent.appendChild(commandInputContainer);

    // Your initial content
    const initialContent = `
        <div class="line">
            <span class="prompt">$</span>
            <span class="command">whoami</span>
        </div>
        <div class="output">
            <pre class="ascii-art">
 █████╗ ███╗   ██╗ █████╗ ███╗   ██╗██╗   ██╗ █████╗         ██╗ █████╗ ██╗███╗   ██╗
██╔══██╗████╗  ██║██╔══██╗████╗  ██║╚██╗ ██╔╝██╔══██╗        ██║██╔══██╗██║████╗  ██║
███████║██╔██╗ ██║███████║██╔██╗ ██║ ╚████╔╝ ███████║        ██║███████║██║██╔██╗ ██║
██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║  ╚██╔╝  ██╔══██║   ██   ██║██╔══██║██║██║╚██╗██║
██║  ██║██║ ╚████║██║  ██║██║ ╚████║   ██║   ██║  ██║    █████╔╝██║  ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝    ╚════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
            </pre>
            <p>Student • Developer • Researcher</p>
        </div>
        <!-- Rest of your content -->
    `;

    // Insert initial content before the command input container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = initialContent.trim();
    while (tempDiv.firstChild) {
        terminalContent.insertBefore(tempDiv.firstChild, commandInputContainer);
    }

    // Force scroll to top immediately and after a small delay to ensure it works
    terminalContent.scrollTop = 0;
    setTimeout(() => {
        terminalContent.scrollTop = 0;
    }, 100);

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
            // Remove the auto-scroll on command
            // terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Extra commands that users can input
    const commands = {
        'cat about.txt': generateAbout,
        'cat projects.txt': generateProjects,
        'cat achievements.txt': generateAchievements,
        'ls ./certificates/': generateCertificates,
        'clear': clearTerminal
    };

    function addToTerminal(type, content) {
        const line = document.createElement('div');
        
        if (type === 'command') {
            line.className = 'line';
            line.innerHTML = `<span class="prompt">$</span> <span class="command">${content}</span>`;
        } else if (type === 'error') {
            line.className = 'error';
            line.textContent = content;
        } else {
            line.className = 'output';
            line.innerHTML = content;
        }
        
        terminalContent.insertBefore(line, commandInputContainer);
    }

    // Command functions
    function generateAbout() {
        addToTerminal('output', `
            <div class="section">
                <h2>About Me</h2>
                <p>I'm a Computer Science student at the University of Toronto, passionate about Machine Learning, AI, and software development.</p>
                <p>Currently focused on ML Engineering and creating scalable AI solutions.</p>
            </div>
        `);
    }

    function generateProjects() {
        addToTerminal('output', `
            <div class="section">
                <h2>Featured Projects</h2>
                <div class="project">
                    <h3>ML Pipeline Development</h3>
                    <p>Developed end-to-end ML model testing pipeline at Uber using Python, Piper, and Buildkite.</p>
                </div>
                <div class="project">
                    <h3>Churn Prediction Model</h3>
                    <p>Enhanced customer churn prediction model at Bell Canada using GCP and ML techniques.</p>
                </div>
            </div>
        `);
    }

    function generateAchievements() {
        addToTerminal('output', `
            <div class="section">
                <h2>Achievements</h2>
                <ul>
                    <li>Dean's List - University of Toronto</li>
                    <li>ML Engineering Excellence - Uber</li>
                    <li>Innovation Award - Bell Canada</li>
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