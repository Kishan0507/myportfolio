function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      items: [
        { name: 'Python', level: 'Intermediate', url: 'https://www.python.org/' },
        { name: 'C', level: 'Intermediate', url: 'https://en.cppreference.com/w/c' },
        { name: 'C++', level: 'Intermediate', url: 'https://isocpp.org/' },
        { name: 'JavaScript', level: 'Intermediate', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      ],
    },
    {
      title: 'Backend & Frameworks',
      items: [
        { name: 'Django', url: 'https://www.djangoproject.com/' },
        { name: 'Django REST Framework', url: 'https://www.django-rest-framework.org/' },
        { name: 'React.js', url: 'https://react.dev/' },
        { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
      ],
    },
    {
      title: 'Database & Storage',
      items: [
        { name: 'SQL', url: 'https://www.w3schools.com/sql/' },
        { name: 'SQLite', url: 'https://www.sqlite.org/' },
        { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      ],
    },
    {
      title: 'Tools & Platforms',
      items: [
        { name: 'Git', url: 'https://git-scm.com/' },
        { name: 'Figma', url: 'https://www.figma.com/' },
        { name: 'Power BI', url: 'https://powerbi.microsoft.com/' },
        { name: 'FFmpeg', url: 'https://ffmpeg.org/' },
        { name: 'OpenCV', url: 'https://opencv.org/' },
      ],
    },

    {
      title: 'Core CS Concepts',
      items: [
        { name: 'System Design', url: 'https://en.wikipedia.org/wiki/Systems_design' },
        { name: 'OOP', url: 'https://en.wikipedia.org/wiki/Object-oriented_programming' },
        { name: 'Data Structures & Algorithms', url: 'https://en.wikipedia.org/wiki/Data_structure' },
        { name: 'Computer Networks', url: 'https://en.wikipedia.org/wiki/Computer_network' },
        { name: 'Operating Systems', url: 'https://en.wikipedia.org/wiki/Operating_system' },
        { name: 'Machine Learning', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
        { name: 'Compiler Design', url: 'https://en.wikipedia.org/wiki/Compiler_design' }
      ],
    },
  ]

  return (
    <div className="page fade-in" id="skills-page">
      <div className="prompt">cat /etc/skills.conf</div>

      <div className="terminal-output">
        <div className="comment">
          Click any skill to visit its official documentation — {skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)} skills across {skillCategories.length} domains
        </div>
      </div>

      <div className="skills-grid stagger">
        {skillCategories.map(cat => (
          <div className="skill-category" key={cat.title}>
            <h3 className="skill-category-title">{cat.title}</h3>
            <div className="skill-tags">
              {cat.items.map(skill => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-tag"
                  title={skill.level ? `${skill.name} — ${skill.level}` : skill.name}
                >
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="prompt-input" style={{ marginTop: '1.5rem' }}>
        <span className="blinking-cursor"></span>
      </div>
    </div>
  )
}

export default Skills
