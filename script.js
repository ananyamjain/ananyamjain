document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const cursor = document.querySelector('.cursor');
    
    // Available commands
    const commands = {
        'about.txt': 'I am a passionate technologist with a focus on innovation and problem-solving.',
        'leadership.txt': '• President, Computer Science Club (2022-2023)\n• Team Lead, Hackathon Project\n• Mentor, First-Year Student Program',
        'certificates/': '📜 AWS Certified Cloud Practitioner\n📜 Google IT Automation with Python\n📜 Meta Frontend Developer Certificate',
        'achievements.txt': '🏆 Dean\'s List (2020-2023)\n🏆 Best Project Award - CS Senior Design\n🏆 1st Place - University Hackathon',
        'interests.txt': '• Open Source Contributing\n• Tech Blogging\n• Competitive Programming\n• Photography'
    };

    // Process commands
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            // Create command line
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
            
            let output = '';
            
            if (command === 'clear') {
                terminalContent.innerHTML = '';
            } else if (command === 'contact --info') {
                output = 'github/ananyamjain linkedin/ananya-m-jain contact@ananyajain.com';
            } else {
                const cmd = command.replace('cat ', '').replace('ls ./', '');
                if (commands[cmd]) {
                    output = commands[cmd];
                } else if (command === 'help') {
                    output = 'Available commands:\n• cat about.txt\n• cat leadership.txt\n• ls ./certificates/\n• cat achievements.txt\n• cat interests.txt\n• contact --info\n• clear';
                } else {
                    output = 'Command not found. Type "help" for available commands.';
                }
            }

            if (command !== 'clear') {
                terminalContent.appendChild(commandLine);
                if (output) {
                    const outputDiv = document.createElement('div');
                    outputDiv.className = 'output';
                    outputDiv.innerHTML = `<pre>${output}</pre>`;
                    terminalContent.appendChild(outputDiv);
                }
            }
            
            // Clear input
            commandInput.value = '';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Basic cursor position update
    commandInput.addEventListener('input', () => {
        const text = commandInput.value;
        const textWidth = getTextWidth(text, '1rem "JetBrains Mono", monospace');
        cursor.style.left = `${textWidth}px`;
    });

    function getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        return context.measureText(text).width;
    }
}); 