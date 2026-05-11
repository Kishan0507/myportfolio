import { useState, useEffect } from 'react'
import { fetchProfile } from '../api'

const KISHAN_ASCII = `
 ██╗  ██╗ ██╗ ███████╗ ██╗  ██╗  █████╗  ███╗   ██╗
 ██║ ██╔╝ ██║ ██╔════╝ ██║  ██║ ██╔══██╗ ████╗  ██║
 █████╔╝  ██║ ███████╗ ███████║ ███████║ ██╔██╗ ██║
 ██╔═██╗  ██║ ╚════██║ ██╔══██║ ██╔══██║ ██║╚██╗██║
 ██║  ██╗ ██║ ███████║ ██║  ██║ ██║  ██║ ██║ ╚████║
 ╚═╝  ╚═╝ ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝
`

function Home() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLines, setShowLines] = useState(0)

  useEffect(() => {
    fetchProfile()
      .then(data => setProfile(data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setShowLines(prev => {
          if (prev >= 10) { clearInterval(timer); return prev; }
          return prev + 1;
        })
      }, 120)
      return () => clearInterval(timer)
    }
  }, [loading])

  const name = profile?.name || 'Kishan Gowda D K'
  const role = profile?.role || 'Software Engineer'
  const college = profile?.college || 'University of Visvesvaraya College of Engineering, Bangalore'
  const github = profile?.github_username || 'Kishan0507'
  const email = profile?.email || '257kishan@gmail.com'

  const bioLines = [
    { key: 'USER', value: name, highlight: true },
    { key: 'ROLE', value: role, highlight: true },
    { key: 'DEGREE', value: 'B.E. Information Science & Engineering' },
    { key: 'COLLEGE', value: college },
    { key: 'LOCATION', value: 'Bangalore, India' },
    { key: 'GITHUB', value: `github.com/${github}` },
    { key: 'EMAIL', value: email },
    { key: 'SHELL', value: '/bin/bash' },
  ]

  const aboutText = `I am a Software Engineer with a strong focus on high-performance backend systems and scalable full-stack architecture. My technical expertise spans Python, C++, and modern frameworks like Django and React. I am deeply passionate about tackling complex engineering challenges—from designing robust web APIs to exploring low-level networking and system design.

I am currently seeking Software Engineering roles where I can leverage my systems programming and full-stack experience to build impactful, scalable solutions. I serve as an Outreach Core Member of Google Developer Groups (GDG) at UVCE, where I promote and support technical workshops and other community-building initiatives.`

  return (
    <div className="page fade-in" id="home-page">
      <div className="home-hero">
        <div className="home-ascii" aria-hidden="true">
          {KISHAN_ASCII}
        </div>

      </div>

      <div className="prompt">whoami</div>

      {loading ? (
        <div className="loading">Fetching profile data...</div>
      ) : (
        <>
          <div className="whoami-block">
            {bioLines.map((line, i) => (
              <div
                key={line.key}
                className="bio-line"
                style={{
                  opacity: i < showLines ? 1 : 0,
                  transform: i < showLines ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span className="key">{line.key}:</span>
                <span className={`value ${line.highlight ? 'highlight' : ''}`}>
                  {line.value}
                </span>
              </div>
            ))}
          </div>

          {showLines >= 10 && (
            <div className="terminal-output fade-in">
              <div className="comment">About</div>
              <div className="about-text">
                {aboutText.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '0.8rem', lineHeight: '1.7' }}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {showLines >= 10 && (
            <div className="prompt-input" style={{ marginTop: '1.5rem' }}>
              <span className="blinking-cursor"></span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
