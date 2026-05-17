import { Trophy, Medal, Users, Terminal, ScrollText, BrainCircuit, Calendar, Image as ImageIcon } from 'lucide-react'

function Achievements() {
  const achievements = [
    {
      id: 1,
      icon: <Trophy size={24} color="var(--yellow)" />,
      title: 'RVITM Hackathon Winner',
      description: '1st place in competitive inter-college hackathon',
      date: 'November 2024',
      image: null,
    },
    {
      id: 2,
      icon: <Medal size={24} color="var(--text)" />,
      title: 'Impetus 25.0 Runner-Up',
      description: '"The Time Traveler\'s Code" — data science challenge',
      date: 'March 2025',
      image: null,
    },
    {
      id: 3,
      icon: <Users size={24} color="var(--blue)" />,
      title: 'HackBengaluru Volunteer',
      description: 'Contributed to organising citywide hackathon',
      date: 'May 2024',
      image: null,
    },
    {
      id: 4,
      icon: <Terminal size={24} color="var(--cyan)" />,
      title: 'Impetus 24.0 Volunteer',
      description: 'Inter-college tech fest',
      date: 'April 2024',
      image: null,
    },
  ]

  const certifications = [
    {
      id: 101,
      icon: <ScrollText size={24} color="var(--green)" />,
      title: 'Python Programming Course',
      description: 'Samsung Innovation Campus',
      image: null,
    },
    {
      id: 102,
      icon: <BrainCircuit size={24} color="var(--purple)" />,
      title: 'Generative AI Mastermind Course',
      description: 'Outskill (SIC)',
      image: null,
    },
  ]

  return (
    <div className="page fade-in" id="achievements-page">
      <div className="prompt">cat achievements</div>

      <div className="terminal-output">
        <div className="comment">
          {achievements.length} achievements unlocked | {certifications.length} certifications earned
        </div>
      </div>

      <div className="stagger">
        {achievements.map(a => (
          <div className="achievement-card" key={a.id}>
            <div className="icon">{a.icon}</div>
            <div className="content">
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              {a.date && <div className="date" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {a.date}</div>}
            </div>

          </div>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: '2rem' }}>Certifications</div>

      <div className="stagger">
        {certifications.map(c => (
          <div className="achievement-card" key={c.id} style={{ borderLeftColor: 'var(--green)' }}>
            <div className="icon">{c.icon}</div>
            <div className="content">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
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

export default Achievements
