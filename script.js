document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const commandInput = document.querySelector('.command-input');
    
    // Remove any existing cursors from previous commands
    function removePreviousCursors() {
        const oldCursors = document.querySelectorAll('.cursor:not(:last-child)');
        oldCursors.forEach(cursor => cursor.remove());
    }

    // Process commands
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            // Create command line without cursor
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
            } else if (commands[command.replace('cat ', '').replace('ls ./', '')]) {
                output.innerHTML = `<pre>${commands[command.replace('cat ', '').replace('ls ./', '')]}</pre>`;
                terminalContent.insertBefore(commandLine, document.querySelector('.command-input-container'));
                terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
            } else {
                output.innerHTML = 'Command not found. Type "help" for available commands.';
                terminalContent.insertBefore(commandLine, document.querySelector('.command-input-container'));
                terminalContent.insertBefore(output, document.querySelector('.command-input-container'));
            }
            
            // Clear input and scroll to bottom
            commandInput.value = '';
            removePreviousCursors();
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });

    // Initial cleanup
    removePreviousCursors();
}); 