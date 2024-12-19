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

    function processCommand(command) {
        const output = document.createElement('div');
        output.className = 'output';

        if (command === 'clear') {
            terminalContent.innerHTML = '';
            return;
        }

        // Add the command to terminal
        const commandLine = document.createElement('div');
        commandLine.className = 'line';
        commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
        terminalContent.appendChild(commandLine);

        // Process command and add output
        if (command === 'contact --info') {
            output.innerHTML = 'github/ananyamjain linkedin/ananya-m-jain contact@ananyajain.com';
            terminalContent.appendChild(output);
        } else if (command === 'help') {
            output.innerHTML = 'Available commands:\n• cat about.txt\n• cat leadership.txt\n• ls ./certificates/\n• cat achievements.txt\n• cat interests.txt\n• contact --info\n• clear';
            terminalContent.appendChild(output);
        } else {
            const cmd = command.replace('cat ', '').replace('ls ./', '');
            if (commands[cmd]) {
                output.innerHTML = commands[cmd];
                terminalContent.appendChild(output);
            } else if (command) {
                output.innerHTML = 'Command not found. Type "help" for available commands.';
                terminalContent.appendChild(output);
            }
        }

        // Scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Handle command input
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            processCommand(command);
            commandInput.value = '';
            cursor.style.left = '0px';
        }
    });

    // Update cursor position
    function updateCursor() {
        const text = commandInput.value;
        const cursorPosition = commandInput.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPosition);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(commandInput).font;
        const width = context.measureText(textBeforeCursor).width;
        cursor.style.left = `${width}px`;
    }

    ['input', 'keydown', 'keyup', 'click', 'mousedown', 'mouseup'].forEach(event => {
        commandInput.addEventListener(event, () => {
            requestAnimationFrame(updateCursor);
        });
    });

    // Focus input when clicking anywhere in terminal
    document.querySelector('.terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    // Initial focus
    commandInput.focus();
}); 