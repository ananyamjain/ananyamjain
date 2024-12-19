document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const commandInput = document.querySelector('.command-input');
    const terminalContent = document.querySelector('.terminal-content');

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        );
        themeToggle.innerHTML = document.documentElement.getAttribute('data-theme') === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    });

    // Command processing
    const commands = {
        'about.txt': `
            I am a passionate technologist with a focus on innovation and problem-solving.
            Currently exploring the intersections of AI, web development, and user experience.
        `,
        'leadership.txt': `
            • President, Computer Science Club (2022-2023)
            • Team Lead, Hackathon Project (Winner)
            • Mentor, First-Year Student Program
        `,
        'certificates/': `
            📜 AWS Certified Cloud Practitioner
            📜 Google IT Automation with Python
            📜 Meta Frontend Developer Certificate
        `,
        'achievements.txt': `
            🏆 Dean's List (2020-2023)
            🏆 Best Project Award - CS Senior Design
            🏆 1st Place - University Hackathon
        `,
        'interests.txt': `
            • Open Source Contributing
            • Tech Blogging
            • Competitive Programming
            • Photography
        `
    };

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            // Create command line
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `<span class="prompt">$</span> <span class="command">${command}</span>`;
            
            // Create output
            const output = document.createElement('div');
            output.className = 'output';
            
            if (command === 'clear') {
                terminalContent.innerHTML = '';
            } else if (commands[command.replace('cat ', '').replace('ls ./', '')]) {
                output.innerHTML = `<pre>${commands[command.replace('cat ', '').replace('ls ./', '')]}</pre>`;
            } else {
                output.innerHTML = 'Command not found. Type "help" for available commands.';
            }
            
            if (command !== 'clear') {
                terminalContent.appendChild(commandLine);
                terminalContent.appendChild(output);
            }
            
            commandInput.value = '';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });
}); 