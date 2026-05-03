import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TerminalPage() {
  const [history, setHistory] = useState([
    { command: 'whoami', output: 'Kishan Gowda D K — Backend Engineer & Systems Programmer.' },
    { command: 'uptime', output: 'up 2 days, 14:23, 1 user, load average: 0.05, 0.03, 0.00' }
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Auto-scroll to bottom when history changes
  const terminalEndRef = useRef(null)
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Focus input when page loads or is clicked
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim()
      if (!cmd) return

      const cmdLower = cmd.toLowerCase()
      let output = ''
      
      switch (cmdLower) {
        case 'help':
          output = `Available commands:
  help       - Show this message
  clear      - Clear terminal history
  whoami     - About Kishan
  ls         - Navigate pages
  cd <dir>   - Change directory (e.g. 'cd skills')
  date       - Show current system date
  sudo       - ?????`
          break
        case 'clear':
          setHistory([])
          setInput('')
          return
        case 'whoami':
          output = 'Kishan Gowda D K — Backend Engineer & Systems Programmer.'
          break
        case 'date':
          output = new Date().toString()
          break
        case 'ls':
          output = 'home/  skills/  my-work/  contributions/  achievements/  contact/  chill/  terminal/'
          break
        case 'sudo':
        case 'sudo su':
        case 'su':
          output = 'user is not in the sudoers file. This incident will be reported.'
          break
        case 'pwd':
          output = '/home/kishan/portfolio'
          break
        default:
          if (cmdLower.startsWith('cd ')) {
            const dir = cmdLower.split(' ')[1].replace('/', '')
            const validDirs = ['home', 'skills', 'my-work', 'contributions', 'achievements', 'contact', 'chill', 'terminal']
            if (validDirs.includes(dir)) {
              output = `Navigating to ~/${dir}...`
              setTimeout(() => {
                navigate(dir === 'home' ? '/' : `/${dir}`)
              }, 400)
            } else if (dir === '..') {
              output = `Navigating back to ~/home...`
              setTimeout(() => {
                navigate('/')
              }, 400)
            } else {
              output = `bash: cd: ${dir}: No such file or directory`
            }
          } else if (cmdLower.startsWith('echo ')) {
            output = cmd.substring(5)
          } else {
            output = `bash: ${cmd}: command not found. Type 'help' for available commands.`
          }
      }

      setHistory(prev => [...prev, { command: input, output }])
      setInput('')
    }
  }

  return (
    <div className="page fade-in" id="terminal-page" onClick={() => inputRef.current?.focus()} style={{ cursor: 'text', minHeight: '60vh' }}>
      <div className="prompt">bash --interactive</div>

      <div className="terminal-output">
        <div className="comment">
          Welcome to Fedora Server 41 (Forty One)<br/>
          Kernel 6.11.4-301.fc41.x86_64 on an x86_64<br/><br/>
          Type 'help' to see available commands.
        </div>
      </div>

      <div className="interactive-cli" style={{ marginTop: '1.5rem' }}>
        <div className="cli-history">
          {history.map((entry, i) => (
            <div key={i} style={{ marginBottom: '0.8rem' }}>
              <div style={{ color: 'var(--prompt)' }}>
                <span style={{ color: 'var(--green)' }}>kishan@fedora</span>
                <span style={{ color: 'var(--text)' }}>:</span>
                <span style={{ color: 'var(--blue)' }}>~/portfolio</span>
                $ {entry.command}
              </div>
              {entry.output && (
                <div style={{ color: 'var(--text-bright)', whiteSpace: 'pre-wrap', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem' }}>
          <span style={{ color: 'var(--prompt)' }}>
            <span style={{ color: 'var(--green)' }}>kishan@fedora</span>
            <span style={{ color: 'var(--text)' }}>:</span>
            <span style={{ color: 'var(--blue)' }}>~/portfolio</span>
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-bright)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              outline: 'none',
              width: '100%'
            }}
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}

export default TerminalPage
