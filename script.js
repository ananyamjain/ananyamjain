document.addEventListener('DOMContentLoaded', () => {
    const files = document.querySelectorAll('.file');
    const codeContent = document.querySelector('.code-content');
    const tabs = document.querySelector('.tabs');

    // Content for different files
    const content = {
        'profile.js': `const profile = {
    name: "Ananya Jain",
    title: "Student • Researcher • Developer",
    
    about: \`Passionate about technology and innovation.
           Currently focused on developing solutions 
           that make a difference.\`,
    
    links: {
        github: "github.com/ananyamjain",
        linkedin: "linkedin.com/in/ananyamjain",
        email: "contact@ananyajain.com"
    }
};`,
        'skills.js': `const skills = {
    languages: [
        "Python",
        "JavaScript",
        "Java"
    ],
    
    webTechnologies: [
        "React",
        "Node.js",
        "HTML/CSS"
    ],
    
    tools: [
        "Git",
        "Docker",
        "AWS"
    ]
};`,
        'projects.js': `const projects = [
    {
        name: "Project 1",
        description: "Description of project 1",
        technologies: ["React", "Node.js"],
        github: "github.com/project1"
    },
    {
        name: "Project 2",
        description: "Description of project 2",
        technologies: ["Python", "AWS"],
        github: "github.com/project2"
    }
];`
    };

    // Handle file clicks
    files.forEach(file => {
        file.addEventListener('click', () => {
            // Update active file
            files.forEach(f => f.classList.remove('active'));
            file.classList.add('active');

            // Update tab
            const fileName = file.textContent;
            tabs.innerHTML = `<div class="tab active">${fileName}</div>`;

            // Update content
            const fileContent = content[fileName] || 'File content not found';
            codeContent.innerHTML = `<pre><code>${fileContent}</code></pre>`;
        });
    });
}); 