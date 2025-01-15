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
            <div class="about-section">
                <div class="about-header">
                    <span class="about-badge">About Me</span>
                </div>
                
                <div class="about-content">
                    <div class="about-text">
                        <p>I'm a Computer Science student at the University of Toronto with a passion for Machine Learning, AI, and software development. Currently, I'm on a one-year co-op at Uber, working on their internal ML platform, Michelangelo. I'm seeking research opportunities for Fall 2025 to advance my expertise and contribute to impactful projects.</p>
                    </div>
                    
                    <div class="about-highlights">
                        <div class="highlight-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Computer Science @ UofT</span>
                        </div>
                        <div class="highlight-item">
                            <i class="fas fa-briefcase"></i>
                            <span>ML Engineer Intern @ Uber</span>
                        </div>
                        <div class="highlight-item">
                            <i class="fas fa-search"></i>
                            <span>Seeking Research Opportunities</span>
                        </div>
                    </div>
                </div>
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
                        <i class="fas fa-th-large view-btn active" data-view="grid"></i>
                        <i class="fas fa-list view-btn" data-view="list"></i>
                    </div>
                </div>
                
                <div class="project-container grid-view" id="projectContainer">
                    <div class="project-item">
                        <div class="project-icon">
                            <i class="fas fa-folder"></i>
                            <i class="project-icon-overlay fas fa-code"></i>
                        </div>
                        <div class="project-content">
                            <h3>ML Pipeline</h3>
                            <div class="project-meta">
                                <span class="project-date">Modified: Jan 2024</span>
                                <span class="project-size">Size: 42MB</span>
                            </div>
                            <div class="project-tags">
                                <span>Python</span>
                                <span>Piper</span>
                                <span>Buildkite</span>
                            </div>
                            <div class="project-description">
                                End-to-end ML model testing pipeline at Uber
                            </div>
                            <div class="project-actions">
                                <a href="#" class="project-action">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="project-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="project-item">
                        <div class="project-icon">
                            <i class="fas fa-folder"></i>
                            <i class="project-icon-overlay fas fa-chart-line"></i>
                        </div>
                        <div class="project-content">
                            <h3>Churn Prediction</h3>
                            <div class="project-meta">
                                <span class="project-date">Modified: Dec 2023</span>
                                <span class="project-size">Size: 128MB</span>
                            </div>
                            <div class="project-tags">
                                <span>GCP</span>
                                <span>ML</span>
                                <span>Python</span>
                            </div>
                            <div class="project-description">
                                Customer churn prediction model at Bell Canada
                            </div>
                            <div class="project-actions">
                                <a href="#" class="project-action">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="project-action">
                                    <i class="fas fa-chart-bar"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // Wait for the DOM to update
        setTimeout(() => {
            const viewBtns = document.querySelectorAll('.view-btn');
            const projectContainer = document.getElementById('projectContainer');
            
            if (viewBtns && projectContainer) {
                viewBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        
                        // Remove active class from all buttons
                        viewBtns.forEach(b => b.classList.remove('active'));
                        
                        // Add active class to clicked button
                        btn.classList.add('active');
                        
                        // Get the view type and update container class
                        const viewType = btn.getAttribute('data-view');
                        projectContainer.className = `project-container ${viewType}-view`;
                    });
                });
            }
        }, 0);
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
            <div class="research-section">
                <h2>Research Work</h2>
                
                <!-- First Research (now completed) -->
                <div class="research-card">
                    <div class="research-header">
                        <span class="status-badge completed">Completed</span>
                        <h3>Quantum Optimization for Planning Domain Definition Language</h3>
                    </div>
                    
                    <div class="research-info">
                        <div class="research-meta">
                            <span><i class="far fa-calendar"></i> 2023</span>
                            <span><i class="fas fa-map-marker-alt"></i> Matter Lab, University of Toronto</span>
                        </div>
                        
                        <p class="research-description">
                            Applying QUBO methodologies for robotic AI planning tasks. Utilized D-Wave Ocean’s dimod package to solve Binary Quadratic Models, generating optimal solutions with
minimal energy.
                        </p>
                        
                        <div class="research-tags">
                            <span class="tag">Quantum Computing</span>
                            <span class="tag">Python</span>
                            <span class="tag">D-Wave</span>
                        </div>
                        
                        <div class="research-links">
                            <a href="https://github.com/ananyamjain/QUBO-Problems" target="_blank" class="research-link">
                                <i class="fab fa-github"></i> View Repository
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Second Research (updated description) -->
                <div class="research-card">
                    <div class="research-header">
                        <span class="status-badge completed">Completed</span>
                        <h3>Comparative Study of CNN, ResNet, and Vision Transformers for Multi-Classification of Chest Diseases</h3>
                    </div>
                    
                    <div class="research-info">
                        <div class="research-meta">
                            <span><i class="far fa-calendar"></i> 2022 - 2023</span>
                            <span><i class="fas fa-map-marker-alt"></i> University of Toronto</span>
                        </div>
                        
                        <p class="research-description">
                            Conducted comparative analysis of Vision Transformers against traditional CNNs and ResNet models for chest X-ray disease classification. Fine-tuned pre-trained and from-scratch ViT models on the NIH Chest X-ray dataset, demonstrating superior performance of pre-trained ViT in identifying 14 distinct lung conditions.
                        </p>
                        
                        <div class="research-tags">
                            <span class="tag">Machine Learning</span>
                            <span class="tag">Neural Networks</span>
                            <span class="tag">PyTorch</span>
                        </div>
                        
                        <div class="research-links">
                            <a href="https://github.com/ananyamjain/CSC413-Final-Project" target="_blank" class="research-link">
                                <i class="fab fa-github"></i> View Repository
                            </a>
                            <a href="https://arxiv.org/abs/2406.00237" target="_blank" class="research-link">
                                <i class="fas fa-file-alt"></i> Read Paper
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
});