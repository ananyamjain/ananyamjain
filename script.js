document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    let commandInput;
    let commandText;
    const terminal = document.querySelector('.terminal');
    let commandInputContainer;

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
        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat experience.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <div class="section-content">
                    <h2>Software Engineering Intern</h2>
                    <p class="company">Uber</p>
                    <p class="location">San Francisco, CA</p>
                    <p class="date">Sep 2024 - Present</p>
                    <ul>
                        <li>Enhanced the end-to-end ML model development experience...</li>
                        <li>Enabled users to add and integrate their own custom integration...</li>
                        <li>Designed and implemented the pipeline in Python...</li>
                    </ul>
                </div>
                <img src="path/to/uber-logo.png" alt="Uber Logo" class="company-logo">
            </div>
            <div class="section">
                <div class="section-content">
                    <h2>Data Engineering and AI Intern</h2>
                    <p class="company">Bell Canada</p>
                    <p class="location">Toronto, ON</p>
                    <p class="date">May 2024 - August 2024</p>
                    <ul>
                        <li>Worked on the ML Eng team to productionize ML models on the Google Cloud Platform</li>
                        <li>Streamlined model validation, testing, and deployment processes for efficiency and reliability.</li>
                        <li>Optimized data processing workflows to handle large-scale datasets effectively.</li>
                        <li>Enhanced a churn prediction model, increasing detection rates and business impact.</li>
                    </ul
                </div>
                <img src="bell-logo.svg" alt="Bell Canada Logo" class="company-logo">
            </div>
        </div>
        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat education.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <div class="section-content">
                    <h2>University of Toronto</h2>
                    <p>Bachelor of Science in Computer Science</p>
                    <p class="location">Toronto, ON</p>
                    <p class="date">2021 - 2026</p>
                    <ul>
                        <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Deep Learning, Analysis and Complexity</li>
                    </ul
                </div>
            <img src="uoft-logo.png" alt="University Logo" class="company-logo">
            </div>
        </div>

        <div class="line">
            <span class="prompt">$</span>
            <span class="command">ls ./skills/</span>
        </div>
        <div class="output">
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>Languages</h3>
                    <ul>
                        <li>Python</li>
                        <li>Java</li>
                        <li>Kotlin</li>
                        <li>SQL</li>
                        <li>SPARQL</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Technologies and Libraries</h3>
                    <ul>
                        <li>React</li>
                        <li>Numpy</li>
                        <li>PyTorch</li>
                        <li>Tensorflow</li>
                        <li>dimod</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    const commands = {
        'cat about.txt': generateAbout,
        'cat projects.txt': generateProjects,
        'cat achievements.txt': generateAchievements,
        'ls ./certificates/': generateCertificates,
        'clear': clearTerminal
    };

    // Insert initial content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = initialContent.trim();
    terminalContent.innerHTML = ''; // Clear existing content
    terminalContent.appendChild(tempDiv);

    // Create command input container
    commandInputContainer = document.createElement('div');
    commandInputContainer.className = 'command-input-container';
    commandInputContainer.innerHTML = `
        <span class="prompt">$</span>
        <span class="command-text"></span>
        <span class="cursor">▋</span>
        <input type="text" class="command-input">
    `;
    terminalContent.appendChild(commandInputContainer);

    // Update references
    commandInput = commandInputContainer.querySelector('.command-input');
    commandText = commandInputContainer.querySelector('.command-text');

    // Keep input focused
    terminal.addEventListener('click', () => commandInput.focus());
    commandInput.focus();
    
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
                
                if (Object.prototype.hasOwnProperty.call(commands, command)) {
                    commands[command]();
                } else {
                    addToTerminal('error', 'Command not found. Check the cheatsheet for available commands.');
                }
            }
            
            commandInput.value = '';
            commandText.textContent = '';
        }
    });

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
        terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to bottom after command
    }

    // Ensure the terminal starts at the top
    terminalContent.scrollTop = 0;

    // Define command functions
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
});