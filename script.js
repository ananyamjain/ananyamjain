document.addEventListener('DOMContentLoaded', () => {
    // Command history functionality
    const commandHistory = [];
    let historyIndex = -1;
    const commandInput = document.querySelector('.command-input');

    // Available commands
    const commands = {
        'help': 'Show available commands',
        'clear': 'Clear the terminal',
        'about': 'Display about information',
        'education': 'Show education details',
        'experience': 'Show work experience',
        'skills': 'List technical skills',
        'contact': 'Show contact information'
    };

    // Remove loading animation after content loads
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 2000);

    // Command input handling
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim()) {
            const command = commandInput.value.trim();
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Process command here
            processCommand(command);
            
            commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });

    function processCommand(command) {
        const output = document.createElement('div');
        output.className = 'section';
        
        switch(command.toLowerCase()) {
            case 'help':
                output.innerHTML = `
                    <h2>Available Commands:</h2>
                    ${Object.entries(commands).map(([cmd, desc]) => 
                        `<p><span style="color: var(--command-color)">${cmd}</span> - ${desc}</p>`
                    ).join('')}
                `;
                break;
            case 'clear':
                clearTerminal();
                return;
            // Add more commands as needed
            default:
                output.innerHTML = `<p>Command not found: ${command}. Type 'help' for available commands.</p>`;
        }
        
        document.querySelector('.terminal-content').insertBefore(
            output, 
            document.querySelector('.command-input-container')
        );
    }

    function clearTerminal() {
        const content = document.querySelector('.terminal-content');
        const input = document.querySelector('.command-input-container');
        content.innerHTML = '';
        content.appendChild(input);
    }
}); 