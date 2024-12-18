document.addEventListener('DOMContentLoaded', () => {
    // Typing animation for commands
    const commands = document.querySelectorAll('.command');
    
    commands.forEach((command, index) => {
        const text = command.textContent;
        command.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    command.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }, index * 1000);
    });
}); 