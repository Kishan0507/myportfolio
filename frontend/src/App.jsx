import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Home as HomeIcon, Wrench, FolderGit2, GitMerge, Trophy, Mail, Gamepad2, TerminalSquare } from 'lucide-react'
import './App.css'

import Home from './pages/Home'
import Contact from './pages/Contact'
import MyWork from './pages/MyWork'
import Skills from './pages/Skills'
import Achievements from './pages/Achievements'
import Contributions from './pages/Contributions'
import Chill from './pages/Chill'
import TerminalPage from './pages/TerminalPage'

function App() {
  const [powerOn, setPowerOn] = useState(true)
  const [visitorCount, setVisitorCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  // Track visitors
  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/kishan-portfolio-uvce/visits')
      .then(res => res.json())
      .then(data => {
        if (data && data.value) setVisitorCount(data.value)
      })
      .catch(() => {
        const count = parseInt(localStorage.getItem('visitor_count') || '9')
        localStorage.setItem('visitor_count', count + 1)
        setVisitorCount(count + 1)
      })
  }, [])

  const handlePower = () => {
    setPowerOn(!powerOn)
    if (!powerOn) {
      navigate('/')
    }
  }

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <span className="dot red" onClick={handlePower} title="Power Off / On" style={{ cursor: 'pointer' }}></span>
        <span className="dot yellow" title="Minimize"></span>
        <span className="dot green" title="Maximize"></span>
        
        {powerOn && (
          <span className="title">
            kishan@fedora:~/portfolio — {visitorCount > 0 ? `Visitors: ${visitorCount}` : '...'}
          </span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {powerOn && (
            <button
              onClick={() => navigate('/terminal')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--cyan)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0 5px'
              }}
              title="Open Terminal mode"
            >
              <TerminalSquare size={18} />
            </button>
          )}
          
          <button 
            onClick={handlePower}
            style={{
              background: 'transparent',
              border: 'none',
              color: powerOn ? 'var(--red)' : 'var(--green)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              lineHeight: 1,
              padding: '0 5px'
            }}
            title={powerOn ? "Power Off" : "Power On"}
          >
            {powerOn ? '⏻' : '⏽'}
          </button>
        </div>
      </div>

      {powerOn ? (
        <div className="terminal-body fade-in">
          <nav className="navbar" id="main-nav">
            <NavLink to="/" end><HomeIcon size={16} /> Home</NavLink>
            <NavLink to="/skills"><Wrench size={16} /> Skills</NavLink>
            <NavLink to="/my-work"><FolderGit2 size={16} /> My Work</NavLink>
            <NavLink to="/contributions"><GitMerge size={16} /> Contributions</NavLink>
            <NavLink to="/achievements"><Trophy size={16} /> Achievements</NavLink>
            <NavLink to="/contact"><Mail size={16} /> Contact</NavLink>
            <NavLink to="/chill"><Gamepad2 size={16} /> Chill</NavLink>

          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/my-work" element={<MyWork />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chill" element={<Chill />} />
            <Route path="/terminal" element={<TerminalPage />} />
          </Routes>
        </div>
      ) : (
        <div className="terminal-body" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-dim)', opacity: 0.5 }}>
            <div>System powered off.</div>
            <div style={{ marginTop: '1rem', cursor: 'pointer', color: 'var(--green)' }} onClick={handlePower}>
              [Press power button or click here to boot]
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
