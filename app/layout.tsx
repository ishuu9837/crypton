import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ishuu.me'),
  title: 'Y Eswar — Data Scientist, Researcher & AI/ML Engineer',
  description: 'Y Eswar builds Miracle and Telex, native desktop apps with local processing, alongside AI pipelines and deep learning research. M.Tech Data Science researcher at GITAM University, Hyderabad.',
  alternates: { canonical: 'https://ishuu.me' },
  openGraph: { title: 'Y Eswar · Apps, data & research', description: 'Native desktop apps, useful tools and machine learning research by Y Eswar.', url: 'https://ishuu.me', type: 'website' },
  twitter: { card: 'summary', title: 'Y Eswar · Apps, data & research', description: 'Data Scientist, ML Engineer and M.Tech researcher. Hyderabad, India.' },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: 'Y Eswar', url: 'https://ishuu.me', jobTitle: 'Data Scientist & ML Engineer', email: 'founder@ishuu.me', sameAs: ['https://github.com/ishuu9837','https://www.linkedin.com/in/eswar854/','https://www.instagram.com/ishuu.me/'], address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' } };
  return <html lang="en" className="light" suppressHydrationWarning><head><link rel="preload" href="/serene/font-3.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('eswar-serene-theme');document.documentElement.classList.toggle('light',t!=='dark');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.classList.add('light')}` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} /></head><body>{children}</body></html>;
}
