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
        'interests.txt': '• Open Source Contributing\n• Tech Blogging\n• Competitive Programming\n• Photography',
        '--info': 'github/ananyamjain linkedin/ananya-m-jain contact@ananyajain.com'
    };

    // Process commands
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            // Create command line without the extra prompt
            const commandLine = document.createElement('div');
            commandLine.className = 'line';
            commandLine.innerHTML = `<span class="prompt">$</span> <span class="command">${command}</span>`;
            
            // Create output
            const output = document.createElement('div');
            output.className = 'output';
            
            if (command === 'clear') {
                while (terminalContent.firstChild) {
                    if (!terminalContent.firstChild.classList?.contains('command-input-container')) {
                        terminalContent.removeChild(terminalContent.firstChild);
                    }
                }
            } else {
                const cmd = command.replace('cat ', '').replace('ls ./', '').replace('contact ', '');
                if (commands[cmd]) {
                    output.innerHTML = `<pre>${commands[cmd]}</pre>`;
                    terminalContent.insertBefore(commandLine, document.querySelector('.command-input-container'));
                    terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
                } else if (command === 'help') {
                    output.innerHTML = `Available commands:\n• cat about.txt\n• cat leadership.txt\n• ls ./certificates/\n• cat achievements.txt\n• cat interests.txt\n• contact --info\n• clear`;
                    terminalContent.insertBefore(commandLine, document.querySelector('.command-input-container'));
                    terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
                } else if (command) {
                    output.innerHTML = 'Command not found. Type "help" for available commands.';
                    terminalContent.insertBefore(commandLine, document.querySelector('.command-input-container'));
                    terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
                }
            }
            
            // Clear input and update cursor
            commandInput.value = '';
            cursor.style.transform = 'translateX(0)';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Update cursor position based on input and selection
    function updateCursorPosition() {
        const inputValue = commandInput.value;
        const selectionStart = commandInput.selectionStart;
        const textBeforeCursor = inputValue.substring(0, selectionStart);
        const textWidth = getTextWidth(textBeforeCursor, getComputedStyle(commandInput).font);
        cursor.style.transform = `translateX(${textWidth}px)`;
    }

    // Listen for all events that might change cursor position
    commandInput.addEventListener('input', updateCursorPosition);
    commandInput.addEventListener('keydown', (e) => setTimeout(updateCursorPosition, 0));
    commandInput.addEventListener('click', updateCursorPosition);
    commandInput.addEventListener('select', updateCursorPosition);

    // Helper function to calculate text width
    function getTextWidth(text, font) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        return context.measureText(text).width;
    }
}); 