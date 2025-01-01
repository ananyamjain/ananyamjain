document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const commandText = document.querySelector('.command-text');
    const terminal = document.querySelector('.terminal');
    
    // Initial content to be displayed
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
██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║   ██╔╝  ██╔══██║   ██   ██║██╔══██║██║██║╚██╗██║
██║  ██║██║ ╚████║██║  ██║██║ ╚████║   ██║   ██║  ██║    █████╔╝██║  ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝    ╚════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
            </pre>
            <p>Student • Researcher • Developer</p>
        </div>

        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat experience.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <h2>Research Assistant</h2>
                <p class="company">University of California, Berkeley</p>
                <p class="location">Berkeley, CA</p>
                <p class="date">2023 - Present</p>
                <p>Description of your research work and achievements.</p>
            </div>
            <div class="section">
                <h2>Software Development Intern</h2>
                <p class="company">Microsoft</p>
                <p class="location">Redmond, WA</p>
                <p class="date">2022</p>
                <p>Description of internship responsibilities and projects.</p>
            </div>
        </div>

        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat education.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <h2>University of California, Berkeley</h2>
                <p>Bachelor of Science in Computer Science</p>
                <p class="location">Berkeley, CA</p>
                <p class="date">2020 - 2024</p>
                <p>Relevant Coursework: Data Structures, Algorithms, Machine Learning</p>
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
                        <li>JavaScript</li>
                        <li>Java</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h3>Technologies</h3>
                    <ul>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>AWS</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Insert initial content before the command input container
    const commandInputContainer = document.querySelector('.command-input-container');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = initialContent;
    while (tempDiv.firstChild) {
        terminalContent.insertBefore(tempDiv.firstChild, commandInputContainer);
    }
    
    // Force scroll to top after initial content is added
    terminalContent.scrollTop = 0;

    // Extra commands that users can input
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

    // Command functions remain the same
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

    // Add this function to scroll to top after content is added
    function scrollToTop() {
        const terminalContent = document.querySelector('.terminal-content');
        terminalContent.scrollTop = 0;
    }

    // Call this function after adding new content
    // For example, after your initial content load:
    window.onload = function() {
        // Your existing initialization code...
        
        // Add this line at the end of your content initialization
        scrollToTop();
    }

    // Also ensure the terminal-content div starts empty and content is added properly
    document.querySelector('.terminal-content').innerHTML = `
        <!-- Your initial content -->
    `;
    scrollToTop();
});