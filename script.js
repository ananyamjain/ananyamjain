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
                            <li>Enhancing the end-to-end ML model development experience on Uber's Michelangelo platform by implementing
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
        'read research': generateResearch,
        'dance': generateDance,
        'theme': switchTheme,
        'wget resume': downloadResume,
        'whoami': generateWhoami,
        'cat experience.txt': generateExperience,
        'cat education.txt': generateEducation,
        'ls ./skills/': generateSkills
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
                        <p>I'm a <span class="highlight">Computer Science</span> student at the <span class="highlight">University of Toronto</span> with a passion for <span class="highlight">Machine Learning</span>, <span class="highlight">AI</span>, and software development. Currently, I'm on a <span class="highlight">one-year co-op at Uber</span>, working on their internal ML platform, <span class="highlight">Michelangelo</span>. I'm seeking <span class="highlight">research opportunities</span> for Fall 2025 to advance my expertise and contribute to impactful projects.</p>
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
                <div class="project-overlay"></div>
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
                    <!-- SmartScanner Project -->
                    <div class="project-item">
                        <button class="close-button">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="project-content">
                            <div class="project-icon">
                                <i class="fas fa-folder"></i>
                                <i class="project-icon-overlay fas fa-code"></i>
                            </div>
                            <h3>SmartScanner Application</h3>
                            <div class="project-meta">
                                <span class="project-date">Modified: Aug 2023</span>
                                <span class="project-size">Size: 42MB</span>
                            </div>
                            <div class="project-tags">
                                <span>Kotlin</span>
                                <span>Java</span>
                            </div>
                            <div class="project-description">
                                SmartScanner application for OpenG2P (internship), implementing an efficient caching mechanism for offline voucher verification and an authentication framework using RSA-based JSON Web Tokens.
                            </div>
                            <div class="project-details">
                                <h4>Key Features:</h4>
                                <ul>
                                    <li>Offline voucher verification system</li>
                                    <li>RSA-based JWT authentication</li>
                                    <li>Efficient caching mechanism</li>
                                    <li>Cross-platform mobile support</li>
                                </ul>
                                <h4>Technical Details:</h4>
                                <p>Built using Kotlin and Java, the application implements a robust caching system that enables offline verification of vouchers. The authentication system uses RSA-based JSON Web Tokens for secure data transmission.</p>
                            </div>
                            <div class="project-actions">
                                <a href="https://github.com/ananyamjain/openg2p-voucher-scanner-app" target="_blank" class="project-action">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="https://www.openg2p.org/" target="_blank" class="project-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- United for Literacy Project -->
                    <div class="project-item">
                        <button class="close-button">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="project-content">
                            <div class="project-icon">
                                <i class="fas fa-folder"></i>
                                <i class="project-icon-overlay fas fa-book"></i>
                            </div>
                            <h3>United for Literacy</h3>
                            <div class="project-meta">
                                <span class="project-date">Modified: Jan 2024</span>
                                <span class="project-size">Size: 156MB</span>
                            </div>
                            <div class="project-tags">
                                <span>React</span>
                                <span>Node.js</span>
                                <span>MongoDB</span>
                            </div>
                            <div class="project-description">
                                A collaborative platform connecting literacy organizations with volunteers. Features include volunteer matching, event management, and impact tracking.
                            </div>
                            <div class="project-details">
                                <h4>Key Features:</h4>
                                <ul>
                                    <li>Volunteer-organization matching system</li>
                                    <li>Event management and scheduling</li>
                                    <li>Impact tracking dashboard</li>
                                    <li>Real-time notifications</li>
                                </ul>
                                <h4>Technical Details:</h4>
                                <p>Built with React and Node.js, following agile methodologies. Uses MongoDB for flexible data storage and real-time updates. Implements responsive design for cross-device compatibility.</p>
                            </div>
                            <div class="project-actions">
                                <a href="https://github.com/csc301-2024-s/27-united-for-literacy" target="_blank" class="project-action">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Ryde Project -->
                    <div class="project-item">
                        <button class="close-button">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="project-content">
                            <div class="project-icon">
                                <i class="fas fa-folder"></i>
                                <i class="project-icon-overlay fas fa-car"></i>
                            </div>
                            <h3>Ryde - Car Marketplace</h3>
                            <div class="project-meta">
                                <span class="project-date">Modified: Dec 2022</span>
                                <span class="project-size">Size: 84MB</span>
                            </div>
                            <div class="project-tags">
                                <span>Java</span>
                                <span>Clean Architecture</span>
                                <span>Design Patterns</span>
                            </div>
                            <div class="project-description">
                                A Java desktop application for finding and listing cars for sale.
                            </div>
                            <div class="project-details">
                                <h4>Key Features:</h4>
                                <ul>
                                    <li>User authentication system</li>
                                    <li>Advanced car listing management</li>
                                    <li>Dealership locator</li>
                                    <li>Smart filtering system</li>
                                </ul>
                                <h4>Technical Details:</h4>
                                <p>Built using Clean Architecture principles and various design patterns including Factory, Dependency Injection, and Singleton. Features a modular design for easy maintenance and scalability.</p>
                            </div>
                            <div class="project-actions">
                                <a href="https://github.com/CSC207-2022F-UofT/course-project-ryde" target="_blank" class="project-action">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // Add click handlers
        setTimeout(() => {
            const projectItems = document.querySelectorAll('.project-item');
            const closeButtons = document.querySelectorAll('.close-button');
            const overlay = document.querySelector('.project-overlay');
            
            projectItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (!e.target.closest('.close-button') && !e.target.closest('a')) {
                        item.classList.add('expanded');
                        overlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            closeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const projectItem = button.closest('.project-item');
                    projectItem.classList.remove('expanded');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            overlay.addEventListener('click', () => {
                const expandedItem = document.querySelector('.project-item.expanded');
                if (expandedItem) {
                    expandedItem.classList.remove('expanded');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // View toggle handlers
            const viewBtns = document.querySelectorAll('.view-btn');
            const projectContainer = document.getElementById('projectContainer');
            
            if (viewBtns && projectContainer) {
                viewBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        viewBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const viewType = btn.getAttribute('data-view');
                        projectContainer.className = `project-container ${viewType}-view`;
                    });
                });
            }
        }, 0);
    }

    function generateAchievements() {
        addToTerminal('output', `
            <div class="about-section">
                <div class="about-header">
                    <span class="about-badge">Achievements</span>
                </div>
                
                <div class="about-content">
                    <div class="achievements-grid">
                        <div class="achievement-item">
                            <div class="achievement-icon">
                                <i class="fas fa-award"></i>
                            </div>
                            <div class="achievement-content">
                                <h3>Dean's List</h3>
                                <p>University of Toronto</p>
                                <span class="achievement-year">2022 - 2023</span>
                            </div>
                        </div>

                        <div class="achievement-item">
                            <div class="achievement-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="achievement-content">
                                <h3>Grace Hopper Scholarship</h3>
                                <p>Grace Hopper Celebration</p>
                                <span class="achievement-year">2022</span>
                            </div>
                        </div>
                    </div>
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
    function generateCertificates() {
        addToTerminal('output', `
            <div class="certificates-section">
                <div class="cert-header">
                    <i class="fas fa-folder-open"></i> ./certificates/
                </div>
                <div class="cert-list">
                    <div class="cert-item">
                        <i class="fas fa-certificate"></i>
                        <a href="https://www.uoft.ai/learnai" target="_blank">Learn AI - UofT AI</a>
                    </div>
                    <div class="cert-item">
                        <i class="fas fa-certificate"></i>
                        <a href="https://learn.dwavesys.com/courses/quantum-programming-101-core" target="_blank">Quantum Programming Core - D-wave</a>
                    </div>
                    <div class="cert-item">
                        <i class="fas fa-certificate"></i>
                        <a href="https://education.scinet.utoronto.ca/course/view.php?id=1332" target="_blank">Introduction to Quantum Computing</a>
                    </div>
                </div>
            </div>
        `);
    }

    function generateSkills() {
        addToTerminal('output', `
            <div class="skills-section">
                <div class="skills-header">
                    <i class="fas fa-folder-open"></i> ./skills/
                </div>
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
        `);
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
                            Applying QUBO methodologies for robotic AI planning tasks. Utilized D-Wave Ocean's dimod package to solve Binary Quadratic Models, generating optimal solutions with
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
                            <span><i class="far fa-calendar"></i> 2024</span>
                            <span><i class="fas fa-map-marker-alt"></i> CSC413 @ University of Toronto</span>
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

    function generateDance() {
        addToTerminal('output', `
            <div class="dance-container">
                <span class="dance-letter">D</span>
                <span class="dance-letter">A</span>
                <span class="dance-letter">N</span>
                <span class="dance-letter">C</span>
                <span class="dance-letter">E</span>
                <span class="dance-letter">!</span>
            </div>
        `);
    }

    function switchTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        const message = newTheme === 'light' 
            ? 'Switched to light theme! 🌞 Use "theme" command to switch back.'
            : 'Switched to dark theme! 🌙 Use "theme" command to switch back.';
        
        addToTerminal('output', `
            <div class="theme-message ${newTheme}">
                ${message}
            </div>
        `);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function downloadResume() {
        addToTerminal('output', `
            <div class="download-section">
                <div class="wget-output">
                    <p>--2024-01-20 12:34:56--  https://ananyajain.dev/resume</p>
                    <p>Resolving ananyajain.dev... 192.168.1.1</p>
                    <p>Connecting to ananyajain.dev|192.168.1.1|:443... connected.</p>
                    <p>HTTP request sent, awaiting response... 200 OK</p>
                    <p>Length: 892KB [application/pdf]</p>
                    <p>Saving to: 'ananya_jain_resume.pdf'</p>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <p class="download-complete">100%[===================>] 892KB  --.-KB/s    in 0.1s</p>
                    <p>'ananya_jain_resume.pdf' saved</p>
                </div>
            </div>
        `);
        
        // Add animation class after a brief delay
        setTimeout(() => {
            const progress = document.querySelector('.progress');
            if (progress) {
                progress.classList.add('animate');
            }
        }, 100);
        
        // Trigger download after animation
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'resume.pdf';
            link.download = 'ananya_jain_resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1500);
    }

    function generateWhoami() {
        addToTerminal('output', `
            <pre class="ascii-art">
 █████╗ ███╗   ██╗ █████╗ ███╗   ██╗██╗   ██╗ █████╗         ██╗ █████╗ ██╗███╗   ██╗
██╔══██╗████╗  ██║██╔══██╗████╗  ██║╚██╗ ██╔╝██╔══██╗        ██║██╔══██╗██║████╗  ██║
███████║██╔██╗ ██║███████║██╔██╗ ██║ ╚████╔╝ ███████║        ██║███████║██║██╔██╗ ██║
██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║  ╚██╔╝  ██╔══██║   ██   ██║██╔══██║██║██║╚██╗██║
██║  ██║██║ ╚████║██║  ██║██║ ╚████║   ██║   ██║  ██║    █████╔╝██║  ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝    ╚════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
            </pre>
            <p>Student • Developer • Researcher</p>
        `);
    }

    function generateExperience() {
        addToTerminal('output', `
            <div class="section">
                <div class="experience-item">
                    <div class="experience-content">
                        <h2>Software Engineering Intern</h2>
                        <p class="company">Uber</p>
                        <p class="location">San Francisco, CA</p>
                        <p class="date">Sep 2024 - Present</p>
                        <ul>
                            <li>Enhancing the end-to-end ML model development experience on Uber's Michelangelo platform by implementing
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
        `);
    }

    function generateEducation() {
        addToTerminal('output', `
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
        `);
    }
});