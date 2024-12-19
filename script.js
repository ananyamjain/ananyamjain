document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const commandText = document.querySelector('.command-text');
    const terminal = document.querySelector('.terminal');
    
    const commands = {
        'whoami': generateIntro,
        'cat experience.txt': generateExperience,
        'cat education.txt': generateEducation,
        'ls ./skills/': generateSkills,
        'contact --info': generateContact,
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
                // Add command to history
                addToTerminal('command', command);
                
                // Process command
                if (commands[command]) {
                    commands[command]();
                } else {
                    addToTerminal('error', 'Command not found. Type "help" for available commands.');
                }
            }
            
            // Clear input
            commandInput.value = '';
            commandText.textContent = '';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Helper function to add content to terminal
    function addToTerminal(type, content) {
        const line = document.createElement('div');
        line.className = 'line';
        
        if (type === 'command') {
            line.innerHTML = `<span class="prompt">$</span> <span class="command">${content}</span>`;
        } else {
            line.className = 'output';
            line.innerHTML = content;
        }
        
        terminalContent.insertBefore(line, document.querySelector('.command-input-container'));
    }

    // Command functions
    function generateIntro() {
        // Add your ASCII art and intro here
    }

    function generateExperience() {
        // Add your experience content here
    }

    function generateEducation() {
        // Add your education content here
    }

    function generateSkills() {
        // Add your skills content here
    }

    function generateContact() {
        // Add your contact info here
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
    
    // Execute initial command
    commands['whoami']();
}); 