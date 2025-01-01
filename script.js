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
       
        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat experience.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <h2>Software Engineering Intern</h2>
                <p class="company">Uber</p>
                <p class="location">San Francisco, CA</p>
                <p class="date">Sep 2024 - Present</p>
                <p>Enhanced the end-to-end ML model development experience on Uber's Michelangelo platform by implementing
                    a configurable integration testing pipeline.</p>
                <p>Enabled users to add and integrate their own custom integration testing pipelines using Flipr, a dynamic
                    configuration management tool developed in-house.</p>
                <p>Designed and implemented the pipeline in Python, leveraging tools like Piper and Buildkite to ensure seamless
                    automation and scalability.</p>
            </div>
            <div class="section">
                <h2>Data Engineering and AI Intern</h2>
                <p class="company">Bell Canada</p>
                <p class="location">Toronto, ON</p>
                <p class="date">May 2024 - August 2024</p>
                <p>Worked on the ML Eng team to productionize ML models on the Google Cloud Platform</p>
                <p>Streamlined model validation, testing, and deployment processes for efficiency and reliability.</p>
                <p>Optimized data processing workflows to handle large-scale datasets effectively.</p>
                <p>Enhanced a churn prediction model, increasing detection rates and business impact.</p>
            </div>
        </div>

        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat education.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <h2>University of Toronto</h2>
                <p>Bachelor of Science in Computer Science</p>
                <p class="location">Toronto, ON</p>
                <p class="date">2021 - 2026</p>
                <p>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Deep Learning, Analysis and Complexity</p>
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