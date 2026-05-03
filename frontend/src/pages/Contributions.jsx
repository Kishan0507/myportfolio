import { CheckCircle2, Activity, Sun, Heart, GitCommit } from 'lucide-react'

function Contributions() {
  const contributions = [
    {
      id: 1,
      hash: '3df5b13',
      title: 'Fix bhyve howto: add missing -T option to vmrun command',
      description: 'Fixed a documentation gap in the Haiku OS bhyve virtualization guide. Merged into official repository.',
      link: 'https://github.com/haiku/website/commit/3df5b1329016d4936180c5d078addf94092e640c',
      repo: 'haiku/website',
      date: 'Mar 11, 2026',
      tag: 'merged',
    },

    {
      id: 2,
      hash: 'gdg-uvce',
      title: 'GDG on Campus UVCE — Core Member',
      description: 'Organized Git & GitHub Workshop, Community Day 2026, and Open Source Intro sessions for 2000+ students.',
      link: 'https://gdg.community.dev/gdg-on-campus-university-visvesvaraya-college-of-engineering-bangalore-india/',
      repo: 'GDG on Campus UVCE',
      date: '2025–2026',
      tag: 'community',
    },
  ]

  const tagColors = {
    merged: { bg: 'rgba(163, 190, 140, 0.15)', color: 'var(--green)', label: <><CheckCircle2 size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> MERGED</> },
    ongoing: { bg: 'rgba(129, 161, 193, 0.15)', color: 'var(--cyan)', label: <><Activity size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> ACTIVE</> },

    community: { bg: 'rgba(180, 142, 173, 0.15)', color: 'var(--purple)', label: <><Heart size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> COMMUNITY</> },
  }

  return (
    <div className="page fade-in" id="contributions-page">
      <div className="prompt">git log --oneline</div>

      <div className="terminal-output">
        <div className="comment">
          Open-source contributions & community involvement
        </div>
      </div>

      <div className="stagger">
        {contributions.map(c => {
          const tag = tagColors[c.tag] || tagColors.ongoing
          return (
            <div className="git-log-entry" key={c.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className="commit-hash" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><GitCommit size={14} /> {c.hash}</span>
                <span className="commit-repo">({c.repo})</span>
                <span
                  style={{
                    background: tag.bg,
                    color: tag.color,
                    padding: '0.1rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  {tag.label}
                </span>
              </div>
              <div className="commit-title">
                <a href={c.link} target="_blank" rel="noopener noreferrer">
                  {c.title}
                </a>
              </div>
              <div className="commit-desc">{c.description}</div>
              {c.date && <div className="commit-date">Date: {c.date}</div>}
            </div>
          )
        })}
      </div>

      <div className="prompt-input" style={{ marginTop: '1.5rem' }}>
        <span className="blinking-cursor"></span>
      </div>
    </div>
  )
}

export default Contributions
