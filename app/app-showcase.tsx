import { ArrowUpRight, Download, FileImage, FileAudio, FileText, Github, Mic, Sparkles } from 'lucide-react';
import { apps } from './content';

// Decorative product illustrations; all actions live in the labelled links below.
function AppIllustration({ name }: { name: string }) {
  return <div className={`app-illustration app-illustration-${name.toLowerCase()}`} aria-hidden="true">
    {name === 'Miracle' ? <div className="conversion-scene">
      <div className="conversion-file"><FileImage size={28}/><span>something.heic</span></div>
      <div className="conversion-path"><span/><Sparkles size={22}/><span/></div>
      <div className="conversion-formats"><span><FileImage size={15}/>JPG</span><span><FileText size={15}/>PDF</span><span><FileAudio size={15}/>More formats</span></div>
      <p>Your files. A little more possibility.</p>
    </div> : <div className="prompter-scene">
      <div className="prompter-camera"/>
      <div className="prompter-script"><span>Take a breath.</span><strong>Keep your eyes up.</strong><span>Tell your story.</span></div>
      <div className="prompter-meter"><Mic size={12}/><i/><i/><i/><i/><i/><i/><i/><span>Find your flow</span></div>
    </div>}
  </div>;
}

export default function AppShowcase() {
  return <section id="apps" className="app-showcase section-line" aria-labelledby="apps-heading">
    <div className="apps-heading"><div><span className="apps-eyebrow">From idea to everyday</span><h2 id="apps-heading">Little apps. Useful things.</h2></div><span className="apps-count">01 — 02</span></div>
    <p className="apps-intro">Tools I’m building for the moments between the big things. Native desktop apps, with local processing at their core.</p>
    <div className="apps-grid">{apps.map(app => <article key={app.name} className="app-card" id={`app-${app.name.toLowerCase()}`} aria-labelledby={`title-${app.name.toLowerCase()}`}>
      <AppIllustration name={app.name}/>
      <div className="app-card-body">
        <div className="app-title-row"><h3 id={`title-${app.name.toLowerCase()}`}>{app.name}</h3><span className="app-release">{app.status}</span></div>
        <p className="app-tagline">{app.tagline}</p><p className="app-description">{app.description}</p>
        <ul className="app-platforms" aria-label={`${app.name} requirements`}>{app.platforms.map(platform => <li key={platform}>{platform}</li>)}</ul>
        <div className="app-actions"><a className="button primary" href={app.releases} target="_blank" rel="noreferrer" aria-label={`Download ${app.name} preview`}><Download size={13}/>Get {app.name}<ArrowUpRight size={12}/></a><a className="app-source" href={app.source} target="_blank" rel="noreferrer" aria-label={`${app.name} source on GitHub`}><Github size={14}/>Source</a></div>
        <p className="app-release-note">{app.releaseNote}</p>
        {app.website && <a className="app-website" href={app.website} target="_blank" rel="noreferrer">Explore {app.name}<ArrowUpRight size={12}/></a>}
      </div>
    </article>)}</div>
    <p className="apps-footnote">Built with curiosity. Shared as open source. Still getting better.</p>
  </section>;
}
