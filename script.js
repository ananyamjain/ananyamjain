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
                <div class="experience-item">
                    <div class="experience-content">
                        <h2>Software Engineering Intern</h2>
                        <p class="company">Uber</p>
                        <p class="location">San Francisco, CA</p>
                        <p class="date">Sep 2024 - Present</p>
                        <ul>
                            <li>Enhancing the end-to-end ML model development experience on Uber’s Michelangelo platform by implementing
a configurable integration testing pipeline.</li>
                            <li>Designing and implementing the pipeline in Python, leveraging tools like Piper and Buildkite to ensure seamless
automation and scalability.</li>
                        </ul>
                    </div>
                    <img src="uber-logo.png" alt="Uber Logo" class="company-logo">
                </div>

                <div class="experience-item">
                    <div class="experience-content">
                        <h2>Data Engineering and AI Intern</h2>
                        <p class="company">Bell Canada</p>
                        <p class="location">Toronto, ON</p>
                        <p class="date">May 2024 - August 2024</p>
                        <ul>
                            <li>Worked on the ML Eng team to productionize ML models on the Google Cloud Platform.</li>
                            <li>Streamlined model validation, testing, and deployment processes for efficiency and reliability.</li>
                            <li>Optimized data processing workflows to handle large-scale datasets effectively.</li>
                            <li>Enhanced a churn prediction model, increasing detection rates and business impact.</li>
                        </ul>
                    </div>
                    <img src="bell-logo.svg" alt="Bell Canada Logo" class="company-logo">
                </div>
            </div>
        </div>
        <div class="line">
            <span class="prompt">$</span>
            <span class="command">cat education.txt</span>
        </div>
        <div class="output">
            <div class="section">
                <div class="experience-item">
                    <div class="experience-content">
                        <h2>University of Toronto</h2>
                        <p class="company">Bachelor of Science in Computer Science</p>
                        <p class="location">Toronto, ON</p>
                        <p class="date">2021 - 2026</p>
                        <ul>
                            <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Deep Learning, Analysis and Complexity</li>
                        </ul>
                    </div>
                    <img src="uoft-logo.png" alt="University of Toronto Logo" class="company-logo">
                </div>
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
        'pwd': generatePwd,
        'cat about.txt': generateAbout,
        'cd projects': generateProjects,
        'cat achievements.txt': generateAchievements,
        'ls ./certificates/': generateCertificates,
        'whereis socials': generateSocials,
        'read research': generateResearch
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
                <ul>
                    <li>I'm a Computer Science student at the University of Toronto, passionate about Machine Learning, AI, and software development.</li>
                    <li>Currently on my 1 year co-op at Uber. Looking for research opportunities for fall 2025. </li>
                </ul>
            </div>
        `);
    }

    function generateProjects() {
        addToTerminal('output', `
            <div class="directory-view">
                <div class="directory-header">
                    <div class="path-navigator">
                        <span class="path-segment">~</span>
                        <span class="path-separator">/</span>
                        <span class="path-segment active">projects</span>
                    </div>
                    <div class="view-toggle">
                        <i class="fas fa-th-large active"></i>
                        <i class="fas fa-list"></i>
                    </div>
                </div>
                
                <div class="project-grid">
                    <div class="project-folder">
                        <div class="folder-icon">
                            <i class="fas fa-folder"></i>
                            <i class="folder-icon-overlay fas fa-code"></i>
                        </div>
                        <div class="folder-content">
                            <h3>ML Pipeline</h3>
                            <div class="folder-meta">
                                <span class="folder-date">Modified: Jan 2024</span>
                                <span class="folder-size">Size: 42MB</span>
                            </div>
                            <div class="folder-tags">
                                <span>Python</span>
                                <span>Piper</span>
                                <span>Buildkite</span>
                            </div>
                            <div class="folder-description">
                                End-to-end ML model testing pipeline at Uber
                            </div>
                            <div class="folder-actions">
                                <a href="#" class="folder-action">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="folder-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="project-folder">
                        <div class="folder-icon">
                            <i class="fas fa-folder"></i>
                            <i class="folder-icon-overlay fas fa-chart-line"></i>
                        </div>
                        <div class="folder-content">
                            <h3>Churn Prediction</h3>
                            <div class="folder-meta">
                                <span class="folder-date">Modified: Dec 2023</span>
                                <span class="folder-size">Size: 128MB</span>
                            </div>
                            <div class="folder-tags">
                                <span>GCP</span>
                                <span>ML</span>
                                <span>Python</span>
                            </div>
                            <div class="folder-description">
                                Customer churn prediction model at Bell Canada
                            </div>
                            <div class="folder-actions">
                                <a href="#" class="folder-action">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="folder-action">
                                    <i class="fas fa-chart-bar"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    function generateAchievements() {
        addToTerminal('output', `
            <div class="section">
                <h2 class="section-title">Achievements</h2>
                <div class="section-content">
                    <ul>
                        <li>Dean's List - University of Toronto</li>
                        <li>Grace Hopper Scholarship 2022</li>
                    </ul>
                </div>
            </div>
        `);
    }

    // Add this helper function at the top level
    async function typeText(text, element, speed = 50) {
        let currentText = '';
        for (const char of text) {
            currentText += char;
            element.textContent = currentText;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    // Modify the generateCertificates function
    async function generateCertificates() {
        const certificates = [
            { text: 'Learn AI - UofT AI', link: 'https://www.uoft.ai/learnai' },
            { text: 'Quantum Programming Core - D-wave', link: 'https://learn.dwavesys.com/courses/quantum-programming-101-core' },
            { text: 'Introduction to Quantum Computing', link: 'https://education.scinet.utoronto.ca/course/view.php?id=1332' }
        ];

        // Add initial section
        addToTerminal('output', `
            <div class="section">
                <h2 class="section-title">Certifications</h2>
                <ul class="certificates-list"></ul>
            </div>
        `);

        const list = document.querySelector('.terminal-content .certificates-list');
        
        for (const cert of certificates) {
            const li = document.createElement('li');
            li.className = 'certificate-item hidden';
            li.innerHTML = `<a href="${cert.link}" target="_blank">${cert.text}</a>`;
            list.appendChild(li);
            
            // Trigger animation after a small delay
            await new Promise(resolve => setTimeout(resolve, 100));
            li.classList.remove('hidden');
            
            // Wait before showing next item
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    }

    function generateSocials() {
        addToTerminal('output', `
            <div class="social-section">
                <h2 class="social-title">Connect With Me</h2>
                <div class="social-list">
                    <div class="social-item">
                        <i class="fab fa-github social-icon"></i>
                        <a href="https://github.com/ananyamjain" target="_blank">github.com/ananyamjain</a>
                    </div>
                    <div class="social-item">
                        <i class="fab fa-linkedin-in social-icon"></i>
                        <a href="https://linkedin.com/in/ananyamjain" target="_blank">linkedin.com/in/ananyamjain</a>
                    </div>
                    <div class="social-item">
                        <i class="fas fa-envelope social-icon"></i>
                        <a href="mailto:ananyamj1@gmail.com">ananyamj1@gmail.com</a>
                    </div>
                </div>
            </div>
        `);
    }

    function generatePwd() {
        addToTerminal('output', `
            <div class="pwd-section">
                <div class="pwd-path">
                    <span class="path-root">~</span>
                    <span class="path-separator">/</span>
                    <span class="path-folder">ananya</span>
                    <span class="path-separator">/</span>
                    <span class="path-folder">portfolio</span>
                </div>
                <div class="directory-tree">
                    <pre class="tree-structure">
├── about.txt
├── projects.txt
├── achievements.txt
├── experience.txt
├── education.txt
├── certificates/
│   ├── quantum-programming.pdf
│   ├── ml-certification.pdf
│   └── quantum-computing.pdf
└── socials/
    ├── github
    ├── linkedin
    └── email
                    </pre>
                </div>
            </div>
        `);
    }

    function setupCheatsheetCommands() {
        const commandExamples = document.querySelectorAll('.command-example');
        
        commandExamples.forEach(example => {
            example.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default behavior
                
                // Get the command text
                const command = example.textContent;
                
                // Set the command input value
                commandInput.value = command;
                commandText.textContent = command;
                
                // Execute the command directly
                if (commands[command]) {
                    addToTerminal('command', command);
                    commands[command]();
                }
                
                // Clear the input
                commandInput.value = '';
                commandText.textContent = '';
                
                // Focus back on the input
                commandInput.focus();
            });
        });
    }

    // Call setupCheatsheetCommands at the end
    setTimeout(() => {
        setupCheatsheetCommands();
    }, 100);

    document.addEventListener('DOMContentLoaded', () => {
        setupCheatsheetCommands();
    });

    function generateResearch() {
        addToTerminal('output', `
            <div class="research-container">
                <div class="research-card">
                    <div class="research-status active">Active</div>
                    <div class="research-content">
                        <h3>Quantum Computing Optimization</h3>
                        <div class="research-meta">
                            <span>Started: Jan 2024</span>
                            <span>Team: 4 members</span>
                        </div>
                        <div class="research-description">
                            Research on quantum algorithms for optimization problems, focusing on QUBO formulations.
                        </div>
                        <div class="research-tags">
                            <span class="tag">Quantum Computing</span>
                            <span class="tag">Optimization</span>
                            <span class="tag">QUBO</span>
                        </div>
                        
                        <div class="code-content">
                            <div class="research-block active">
                                <div class="block-header">
                                    <span class="status-indicator">+</span>
                                    <h3>Quantum Computing Research</h3>
                                    <span class="commit-hash">#ae1db4f</span>
                                </div>
                                <div class="block-meta">
                                    <span class="branch">branch: quantum-optimization</span>
                                    <span class="timeline">2023 - Present</span>
                                    <span class="location">@UofT</span>
                                </div>
                                <div class="diff-content added">
                                    <pre><code>Working on quantum computing algorithms for optimization problems, 
specifically focusing on the application of quantum annealing in solving 
complex scheduling problems.</code></pre>
                                </div>
                                <div class="tech-stack">
                                    <span class="tech">quantum-computing</span>
                                    <span class="tech">optimization</span>
                                    <span class="tech">d-wave</span>
                                </div>
                                <div class="block-footer">
                                    <a href="https://github.com/ananyamjain/QUBO-Problems" target="_blank" class="action-btn">
                                        <i class="fas fa-code-branch"></i> View Repository
                                    </a>
                                </div>
                            </div>

                            <div class="research-block completed">
                                <div class="block-header">
                                    <span class="status-indicator">✓</span>
                                    <h3>Machine Learning Research</h3>
                                    <span class="commit-hash">#f8e92a1</span>
                                </div>
                                <div class="block-meta">
                                    <span class="branch">branch: neural-optimization</span>
                                    <span class="timeline">2022 - 2023</span>
                                    <span class="location">@UofT</span>
                                </div>
                                <div class="diff-content modified">
                                    <pre><code>Developed novel approaches to neural network optimization using 
quantum-inspired algorithms, resulting in improved training efficiency 
for deep learning models.</code></pre>
                                </div>
                                <div class="tech-stack">
                                    <span class="tech">machine-learning</span>
                                    <span class="tech">neural-networks</span>
                                    <span class="tech">pytorch</span>
                                </div>
                                <div class="block-footer">
                                    <a href="https://github.com/ananyamjain/CSC413-Final-Project" target="_blank" class="action-btn">
                                        <i class="fas fa-code-branch"></i> View Repository
                                    </a>
                                    <a href="https://arxiv.org/abs/2406.00237" target="_blank" class="action-btn">
                                        <i class="fas fa-file-code"></i> Read Paper
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
});