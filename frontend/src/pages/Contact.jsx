import { Mail, Briefcase, Code2, FileCode2, Users, Send, Terminal } from 'lucide-react'

function Contact() {
  const email = '257kishan@gmail.com'
  const linkedin = 'https://www.linkedin.com/in/kishan-gowda-d-k-680310297'
  const github = 'Kishan0507'
  const gdg = 'https://gdg.community.dev/gdg-on-campus-university-visvesvaraya-college-of-engineering-bangalore-india/'

  return (
    <div className="page fade-in" id="contact-page">
      <div className="prompt">cat contacts.txt</div>

      <div className="terminal-output stagger">
        <div className="comment">Contact Information — Kishan Gowda D K</div>

        <div className="contact-item">
          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={16} /> EMAIL
          </span>
          <a href={`mailto:${email}`}>{email}</a>
        </div>

        <div className="contact-item">
          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={16} /> LINKEDIN
          </span>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            linkedin.com/in/kishan-gowda-d-k
          </a>
        </div>

        <div className="contact-item">
          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code2 size={16} /> GITHUB
          </span>
          <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
            github.com/{github}
          </a>
        </div>



        <div className="contact-item">
          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} /> GDG
          </span>
          <a href={gdg} target="_blank" rel="noopener noreferrer">
            GDG on Campus UVCE, Bangalore
          </a>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <div className="comment">Send a quick message</div>
          <div className="contact-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
            <code style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              $ echo &quot;Hello!&quot;
            </code>
            <a href={`mailto:${email}?subject=Hiring Inquiry — Portfolio&body=Hi Kishan,%0A%0AI found your portfolio and would like to discuss...`}>
              <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={14} /> Open Mail Client
              </button>
            </a>
          </div>
        </div>

        <div className="prompt-input" style={{ marginTop: '2rem' }}>
          <span className="blinking-cursor"></span>
        </div>
      </div>
    </div>
  )
}

export default Contact
