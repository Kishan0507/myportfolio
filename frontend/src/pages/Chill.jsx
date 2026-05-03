import { useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════
   "Fix the Broken DNF Command" — Fedora Terminal Puzzle Game
   ═══════════════════════════════════════════════════════════════ */

const CHALLENGES = [
  {
    broken: 'sudp dnf update',
    answer: 'sudo dnf update',
    hint: 'Check the first word for a typo.',
  },
  {
    broken: 'dnf instal httpd',
    answer: 'dnf install httpd',
    hint: 'The action word is missing a letter.',
  },
  {
    broken: 'sudo dnf remov nginx',
    answer: 'sudo dnf remove nginx',
    hint: 'The action word is incomplete.',
  },
  {
    broken: 'dnf serach python3',
    answer: 'dnf search python3',
    hint: 'Two letters are swapped in the action.',
  },
  {
    broken: 'sudo dnf upgrate --refresh',
    answer: 'sudo dnf upgrade --refresh',
    hint: 'Check the action word ending.',
  },
  {
    broken: 'dnf lsit installed',
    answer: 'dnf list installed',
    hint: 'The action has swapped letters.',
  },
  {
    broken: 'sudo dnf grup install "Development Tools"',
    answer: 'sudo dnf group install "Development Tools"',
    hint: 'The subcommand is missing a vowel.',
  },
  {
    broken: 'dnf ifno kernel',
    answer: 'dnf info kernel',
    hint: 'The action letters are in wrong order.',
  },
  {
    broken: 'sudo dnf cleane all',
    answer: 'sudo dnf clean all',
    hint: 'The action word has an extra letter.',
  },
  {
    broken: 'dnf repolsit --enabled',
    answer: 'dnf repolist --enabled',
    hint: 'Two letters are swapped in the action.',
  },
]

function shuffleChallenges() {
  const shuffled = [...CHALLENGES]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function Chill() {
  const [challenges] = useState(() => shuffleChallenges())
  const [currentRound, setCurrentRound] = useState(0)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [history, setHistory] = useState([])

  const totalRounds = challenges.length

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return

    const isCorrect = trimmed === challenges[currentRound].answer
    const newHistory = [...history, {
      broken: challenges[currentRound].broken,
      userAnswer: trimmed,
      correct: isCorrect,
      expected: challenges[currentRound].answer,
    }]
    setHistory(newHistory)

    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback({ type: 'correct', msg: '✓ Correct! Well done.' })
    } else {
      setFeedback({
        type: 'wrong',
        msg: `✗ Wrong! Expected: ${challenges[currentRound].answer}`,
      })
    }

    setTimeout(() => {
      if (currentRound + 1 >= totalRounds) {
        setGameOver(true)
      } else {
        setCurrentRound(prev => prev + 1)
        setInput('')
        setFeedback(null)
        setShowHint(false)
      }
    }, 1800)
  }, [input, currentRound, challenges, totalRounds, history])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const resetGame = () => {
    setCurrentRound(0)
    setInput('')
    setScore(0)
    setFeedback(null)
    setShowHint(false)
    setGameOver(false)
    setHistory([])
  }

  const getEndMessage = () => {
    const pct = (score / totalRounds) * 100
    if (pct === 100) return '🎖️ Perfect! You are a Fedora master!'
    if (pct >= 80) return '🔥 Excellent! You know your way around DNF.'
    if (pct >= 50) return '👍 Not bad! Keep practicing those commands.'
    return '📖 Time to read the dnf manual! Try: man dnf'
  }

  if (gameOver) {
    return (
      <div className="page fade-in" id="chill-page">
        <div className="prompt">game --results</div>
        <div className="game-container">
          <div className="game-over">
            <h2>Game Over!</h2>
            <div className="final-score">{score}/{totalRounds}</div>
            <div className="message">{getEndMessage()}</div>
            <button type="button" onClick={resetGame}>
              ▶ Play Again
            </button>
          </div>

          {/* History */}
          <div style={{ marginTop: '1.5rem' }}>
            <div className="comment" style={{ color: 'var(--text-dim)' }}># Round history</div>
            {history.map((h, i) => (
              <div
                key={i}
                className={`game-feedback ${h.correct ? 'correct' : 'wrong'}`}
                style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}
              >
                <div><strong>Q:</strong> {h.broken}</div>
                <div><strong>A:</strong> {h.userAnswer}</div>
                {!h.correct && <div><strong>Expected:</strong> {h.expected}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const challenge = challenges[currentRound]

  return (
    <div className="page fade-in" id="chill-page">
      <div className="prompt">game --fix-the-command</div>

      <div className="terminal-output">
        <div className="comment">
          Fix the broken DNF command! Type the correct version below.
        </div>
      </div>

      <div className="game-container">
        {/* Header */}
        <div className="game-header">
          <span className="game-round">
            Round {currentRound + 1}/{totalRounds}
          </span>
          <span className="game-score">
            Score: {score}
          </span>
        </div>

        {/* Question */}
        <div className="game-question">
          <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
            Broken command:
          </div>
          <div className="broken-cmd">
            $ {challenge.broken}
          </div>
          {showHint && (
            <div className="hint">💡 {challenge.hint}</div>
          )}
        </div>

        {/* Input */}
        <div className="game-input-row">
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>$</span>
          <input
            className="terminal-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type the correct command..."
            autoFocus
            disabled={!!feedback}
          />
          <button type="button" onClick={handleSubmit} disabled={!!feedback}>
            Enter
          </button>
        </div>

        {/* Hint toggle */}
        {!showHint && !feedback && (
          <button
            type="button"
            onClick={() => setShowHint(true)}
            style={{ marginTop: '0.8rem', fontSize: '0.8rem', opacity: 0.7 }}
          >
            💡 Show Hint
          </button>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`game-feedback ${feedback.type} fade-in`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  )
}

export default Chill
