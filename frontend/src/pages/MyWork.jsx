import { useState, useEffect } from 'react'
import { Server, ShieldCheck, FolderGit2 } from 'lucide-react'
import { fetchGitHubRepos } from '../api'

function MyWork() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGitHubRepos()
      .then(data => setRepos(data))
      .catch(err => setError(err.message || 'Failed to fetch repos'))
      .finally(() => setLoading(false))
  }, [])

  const featuredProjects = [
    {
      name: 'MOBILE-HOST',
      lang: 'C++',
      description: 'A lightweight, single-threaded HTTP server written in C++. Listens on port 8080. Ideal for learning low-level networking or testing basic HTTP functionality on localhost.',
      url: 'https://github.com/Kishan0507/MOBILE-HOST',
      icon: <Server size={32} color="var(--blue)" />
    },
    {
      name: 'moviepiracy',
      lang: 'Python / Django',
      description: 'CineMark Anti-Piracy Ecosystem. Automatically processes video files with FFmpeg to embed hidden, theatre-specific ECDSA-signed watermarks for leak identification.',
      url: 'https://github.com/Kishan0507/moviepiracy',
      icon: <ShieldCheck size={32} color="var(--green)" />
    }
  ]

  return (
    <div className="page fade-in" id="mywork-page">
      <div className="prompt">ls -la ~/projects/</div>

      <div className="section-title">Featured Systems Projects</div>
      <div className="stagger" style={{ marginBottom: '2rem' }}>
        {featuredProjects.map(p => (
          <div className="card" key={p.name} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '2rem' }}>{p.icon}</div>
            <div>
              <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
                <span className="repo-lang" style={{ fontSize: '0.8rem', background: 'var(--bg-darkest)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{p.lang}</span>
              </h3>
              <p style={{ marginTop: '0.5rem' }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="prompt">cat all_repositories.txt</div>

      {loading && <div className="loading">Fetching repositories from GitHub...</div>}
      {error && <div className="error-msg">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="terminal-output">
            <div className="comment">
              total {repos.length} repositories — fetched live via GitHub API
            </div>
          </div>

          <div className="ls-header">
            <span>NAME</span>
            <span>LANG</span>
            <span>★</span>
            <span>DESCRIPTION</span>
          </div>

          <ul className="repo-list stagger">
            {repos.map(repo => (
              <li key={repo.name}>
                <a
                  className="repo-name"
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FolderGit2 size={16} color="var(--prompt)" />
                  {repo.name}
                </a>
                <span className="repo-lang">{repo.language || '—'}</span>
                <span className="repo-stars">★ {repo.stargazers_count}</span>
                <span className="repo-desc">{repo.description || 'No description'}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MyWork
