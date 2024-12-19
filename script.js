document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    const commandText = document.querySelector('.command-text');
    const terminal = document.querySelector('.terminal');
    
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
                const line = document.createElement('div');
                line.className = 'line';
                line.innerHTML = `<span class="prompt">$</span> ${command}`;
                terminalContent.insertBefore(line, document.querySelector('.command-input-container'));
                
                // Process command
                if (command === 'clear') {
                    const elements = Array.from(terminalContent.children);
                    elements.forEach(el => {
                        if (!el.classList.contains('command-input-container')) {
                            el.remove();
                        }
                    });
                } else if (command === 'contact --info') {
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.textContent = 'github/ananyamjain linkedin/ananya-m-jain contact@ananyajain.com';
                    terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
                }
                // ... rest of your command processing ...
            }
            
            // Clear input
            commandInput.value = '';
            commandText.textContent = '';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Initial focus
    commandInput.focus();
}); 