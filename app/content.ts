export const apps = [
  {
    name: 'Miracle',
    tagline: 'A new form for your files.',
    description: 'Convert images, video, audio, documents and more, right on your computer. A native file companion for Mac and Windows, without a cloud conversion service.',
    platforms: ['macOS 13+ · Apple silicon', 'Windows 11 · x64 / ARM64'],
    status: 'Preview',
    source: 'https://github.com/ishuu9837/Miracle',
    releases: 'https://github.com/ishuu9837/Miracle/releases',
    website: undefined,
    releaseNote: 'Preview builds · Mac is not notarized; Windows builds are unsigned. See release notes for setup and platform limits.',
  },
  {
    name: 'Telex',
    tagline: 'Keep your eyes up. Find your flow.',
    description: 'A native Mac teleprompter that keeps your script near the camera. Read at your own pace with continuous scrolling, voice-level pacing and navigable cues.',
    platforms: ['macOS 14+', 'Apple silicon & Intel'],
    status: 'Development preview',
    source: 'https://github.com/ishuu9837/Telex',
    releases: 'https://github.com/ishuu9837/Telex/releases',
    website: 'https://telex-website-tau.vercel.app/',
    releaseNote: 'Development build · Not Developer ID signed or notarized. See release notes for setup and known limitations.',
  },
];

// Supplied portfolio content. Missing source and publication URLs are omitted.
const projectData = [
  { title: 'EduSentinel', category: 'EDUCATION / ANOMALY DETECTION', description: 'A NumPy-only deep autoencoder that flags abnormal learning behaviour in LMS data across 8 features.', metric: '99.40%', metricLabel: 'ROC-AUC', tags: ['Autoencoder', 'NumPy', 'Flask', 'Anomaly detection'], url: 'https://edusentinel.vercel.app', linkLabel: 'Live demo', visual: 'signal', detail: '90.43% accuracy and 100% recall. Findings published on ResearchGate. The model uses eight LMS features to identify abnormal learning behaviour.' },
  { title: 'Smart Energy Grids & Sustainability', category: 'BIG DATA / SUSTAINABILITY', description: 'A case study on data-driven power distribution, with an interactive energy-balance demo.', metric: 'Demand', metricLabel: 'FORECASTING', tags: ['Big Data', 'Forecasting', 'LSTM', 'Smart grid'], url: 'https://smart-energy-grid-app.vercel.app', linkLabel: 'Live demo', visual: 'grid', detail: 'Proposed a pipeline for demand forecasting and adaptive grid control, connecting Big Data Analytics with sustainable power distribution.' },
  { title: 'MRS by Letterboxd', category: 'RECOMMENDATION SYSTEMS', description: 'A film discovery and recommendation experience with title, language, year and genre filters, linked to Letterboxd.', tags: ['Recommendation', 'Python', 'Cosine similarity'], url: 'https://movie-recommendation-using-letterbo.vercel.app', linkLabel: 'Live demo', detail: 'The Python backend encodes genres and ranks films using cosine similarity. Title, language, year and genre filters shape discovery, with browser filtering available as a fallback.' },
  { title: 'Heart Disease Prediction', category: 'MEDICAL AI', description: 'A deep autoencoder for the UCI Heart Disease dataset, with threshold tuning and class-imbalance handling.', metric: '96.3%', metricLabel: 'ACCURACY', tags: ['Autoencoder', 'TensorFlow', 'Keras', 'Deep learning'], detail: 'L1/L2 regularization and dropout support the deep autoencoder. Threshold tuning and class-imbalance handling are part of the prediction pipeline.' },
  { title: 'Image Colourisation', category: 'COMPUTER VISION', description: 'A U-Net convolutional autoencoder in LAB colour space on CIFAR-10, using VGG perceptual loss.', tags: ['U-Net', 'PyTorch', 'Perceptual loss', 'Computer vision'], detail: 'Developed through three architecture iterations and migrated from TensorFlow to PyTorch.' },
  { title: 'Real-Time Face Detection', category: 'COMPUTER VISION', description: 'An OpenCV pipeline that stores detected faces in MongoDB. Research published on ResearchGate.', metric: '1,000+', metricLabel: 'FPS · 30% SPEED BOOST', tags: ['OpenCV', 'MongoDB', 'Python'], url: 'https://github.com/ishuu9837/REAL-TIME-FACE-DETECTION', linkLabel: 'View source', detail: 'The OpenCV pipeline achieved a 30% speed boost and 1,000+ FPS, with detected faces stored in MongoDB.' },
  { title: 'Galaxy Glide', category: 'WEB / INTERACTION', description: 'A responsive interactive front end, tested across browsers and devices.', metric: '40%', metricLabel: 'FASTER PAGE LOAD', tags: ['HTML', 'CSS', 'JavaScript'], url: 'https://github.com/ishuu9837/GALAXY-GLIDE', linkLabel: 'View source', detail: '40% faster page load and 35% higher user engagement. Tested across browsers and devices.' },
];

export const projects = [projectData[0], projectData[1], projectData[2], projectData[3], projectData[5], projectData[4]].map((project, i) => ({...project, preview: i < 3 ? ['/assets/preview-edusentinel.webp', '/assets/preview-energy.webp', '/assets/preview-mrs-updated.webp'][i] : undefined}));

export const skillGroups = [
  { title: 'Native app development', number: '00', description: 'Useful tools, built for the desktop.', skills: ['Swift','SwiftUI','AppKit','C#','WPF','.NET'] },
  { title: 'Machine learning & AI', number: '01', description: 'From the first experiment to the trained model.', skills: ['PyTorch','TensorFlow','Keras','Scikit-learn','OpenCV','NumPy','Pandas','Autoencoders','U-Net','Few-shot learning'] },
  { title: 'Programming & data', number: '02', description: 'The foundations behind the pipeline.', skills: ['Python','SQL','JavaScript','HTML/CSS','Flask','Django','MongoDB'] },
  { title: 'Cloud, BI & tools', number: '03', description: 'Making the work useful beyond the notebook.', skills: ['AWS','Docker','Power BI','Tableau','Git & GitHub','Jupyter','Google Colab','Linux','Claude','Manus','Codex'] },
];

export const experience = [
  { role:'Personal Tutor (Maths, Stats & Python)', company:'Freelancer.com', dates:'Jan 2025 — Jul 2025', description:'Taught Mathematics, Statistics and Python to a global student base with personalized lesson plans and interactive coding sessions.' },
  { role:'Freelance Researcher', company:'Fiverr', dates:'Nov 2024 — May 2025', description:'Statistical analysis and research consulting: data cleaning, validation and regression analysis.' },
];

export const education = [
  { degree:'M.Tech in Data Science', school:'GITAM University', place:'Hyderabad', dates:'2025 — 2027', score:'8.95 CGPA', current:true },
  { degree:'B.Tech in CSE (Artificial Intelligence)', school:'Parul University', place:'Vadodara', dates:'2021 — 2025', score:'7.13 CGPA' },
];

export const certifications = [
  { title:'Professional Certification in Data Science & AI', issuer:'IIT Roorkee via Intellipaat · 2025', score:'A Grade', url:'https://tih.iitr.ac.in/certificate/intellipaat/IPTIH25070775.jpg' },
  { title:'Introduction to Machine Learning', issuer:'NPTEL / Coursera', score:'100/100' },
  { title:'Introduction to Cybersecurity', issuer:'Cisco', url:'https://www.credly.com/badges/2f2ea326-f082-4302-adad-f97ff5e5eef4' },
  { title:'Python Essentials 1', issuer:'Cisco', score:'100/100', url:'https://www.credly.com/badges/038d86bf-0279-4e10-9751-9c3c0a5c195e/linked_in_profile' },
  { title:'Python Essentials 2', issuer:'Cisco', score:'100/100', url:'https://www.credly.com/badges/2ebedeb7-139b-42af-ab17-7c387deb94d6/linked_in_profile' },
];

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const site = {
  name: 'Y Eswar',
  email: 'founder@ishuu.me',
  url: 'https://ishuu.me',
  linkedin: 'https://www.linkedin.com/in/eswar854/',
  github: 'https://github.com/ishuu9837',
  instagram: 'https://www.instagram.com/ishuu.me/',
  // Used if NEXT_PUBLIC_LAST_UPDATED is not set at build time.
  lastUpdatedFallback: '2026-10-22',
};

export const publications = [
  { title: 'Real-Time Face Detection Using OpenCV', description: 'Real-time facial recognition with OpenCV, covering effectiveness and adaptability in cybersecurity applications.', venue: 'ResearchGate', date: 'December 2024' },
  { title: 'EduSentinel: Anomaly Detection in Education Using a Deep Autoencoder', description: 'Research findings from the abnormal learning behaviour detection project.', venue: 'ResearchGate', date: 'December 2024' },
];

export const researchFacts = [
  ['Status', 'In progress'],
  ['Where', 'M.Tech · GITAM University'],
  ['Approach', 'Meta-learning · Few-shot learning'],
  ['Domain', 'Medical imaging'],
  ['Framework', 'PyTorch'],
];

export const faqs = [
  { id: 'roles', q: 'What kind of roles are you looking for?', a: 'Research internships and full-time roles in data science, ML engineering, Gen AI and data analytics, including computer vision, medical imaging and data analyst positions. Remote, hybrid or onsite.' },
  { id: 'research', q: 'What is your M.Tech research about?', a: 'Cross-domain few-shot learning for histopathology images: how models can learn from limited labelled data and transfer that learning across image domains. It is active research at GITAM University.' },
  { id: 'tools', q: 'Which tools do you work with most?', a: 'Python with PyTorch, TensorFlow, Keras, scikit-learn and OpenCV for modelling; SQL, Flask and Django for data and services; and Docker, AWS, Power BI and Tableau to make the work useful beyond the notebook. AI assistants such as Claude, Codex and Manus are part of my toolkit too.' },
  { id: 'demos', q: 'Can I try your projects or read the code?', a: 'Miracle and Telex have downloadable preview builds and source links in the Apps section. Several ML projects have a live demo or a source link on their card: EduSentinel, Smart Energy Grids, MRS by Letterboxd, Real-Time Face Detection and Galaxy Glide. Each card also has project notes with more detail.' },
  { id: 'publications', q: 'Where can I read your publications?', a: 'Two papers were published on ResearchGate in December 2024: Real-Time Face Detection Using OpenCV, and EduSentinel: Anomaly Detection in Education Using a Deep Autoencoder. You will find them under Research & publications.' },
  { id: 'contact', q: 'What is the best way to reach you?', a: 'Email founder@ishuu.me, or use the message form in the Contact section. You can also find me on LinkedIn and GitHub.' },
  { id: 'location', q: 'Where are you based?', a: 'Hyderabad, Telangana, India, and open to remote work.' },
];

// Front-end only: this stops casual browsing, it is NOT real security (the hash ships to the browser).
// Default passcode: eswar2026. To change it: printf 'new-passcode' | sha256sum
export const reviewerAccess = {
  hash: '75302445fd150cb2681ff040d3a91164f455d9aae2dca0efdc0181ca1c15c1bd',
  notes: [
    'Replace this line in app/content.ts (reviewerAccess.notes) with the private material you want reviewers to see: progress notes, draft links or a CV link.',
  ],
};
