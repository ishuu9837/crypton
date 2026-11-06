export const email = "founder@ishuu.me";
export const github = "https://github.com/ishuu9837";
export const linkedin = "https://www.linkedin.com/in/eswar854/";

export const about =
  "I’m Y Eswar, a data scientist, researcher, and AI/ML engineer based in Hyderabad. I’m pursuing an M.Tech in Data Science at GITAM University while building native tools and exploring how machine learning can solve practical problems.";

export const focus = [
  ["Applied AI", "I explore machine learning through anomaly detection, recommendation systems, and computer vision."],
  ["Data Science", "I work with data cleaning, validation, statistical analysis, and forecasting."],
  ["Native Tools", "I’m building Miracle, a file converter, and Telex, a native Mac teleprompter."],
  ["Product Interfaces", "I build interfaces that make technical workflows easier to use, from research demos to desktop tools."],
  ["Research", "My projects include work on unusual learning behaviour and real-time face detection with OpenCV."],
];

export const previews = [
  { name: "EduSentinel", image: "/media/edusentinel.webp" },
  { name: "Hark Artifacts", image: "/media/hark.jpg" },
  { name: "MRS by Letterboxd", image: "/media/mrs.webp" },
  { name: "Smart Energy Grid", image: "/media/energy.webp" },
  { name: "The Field Notes", image: "/media/portfolio.jpg" },
] as const;

export type Project = {
  name: string;
  image: string;
  category: string;
  overview: string;
  detail: string;
  stack: string;
  url?: string;
  linkLabel?: string;
  illustration?: boolean;
};

export const projects: Project[] = [
  {
    ...previews[2], category: "Recommendations / Web",
    overview: "A different route to your next film",
    detail: "A discovery interface with filters for language, year, and genre, backed by cosine-similarity recommendations.",
    stack: "Python · Cosine similarity · Web UI",
    url: "https://movie-recommendation-using-letterbo.vercel.app",
  },
  {
    ...previews[0], category: "Applied ML / Research",
    overview: "Anomaly detection for learning platforms",
    detail: "An eight-feature, NumPy-only deep autoencoder flags unusual patterns in LMS data.",
    stack: "NumPy · Flask · Autoencoders",
    url: "https://edusentinel.vercel.app",
  },
  {
    name: "Hark Design Card", image: "/media/hark.jpg", category: "Product design / Prototype",
    overview: "A workspace for files created in chat",
    detail: "An independent interface concept for browsing generated files, comparing revisions, and finding the messages they came from.",
    stack: "Interaction design · React · Prototyping", url: "https://hark-artifacts-demo.vercel.app",
  },
  {
    name: "Applied AI Specialist", image: "/media/applied-ai.jpg", category: "Applied AI / Education",
    overview: "A hands-on AI engineering roadmap",
    detail: "The Applied AI Engineer site organizes a 20-day curriculum around practical missions, projects, and progress tracking.",
    stack: "AI engineering · Curriculum · Web app", url: "https://applied-ai-engineer-nu.vercel.app",
  },
  {
    name: "Telex Website", image: "/media/telex.jpg", category: "Native tools / Website",
    overview: "A teleprompter that sits near your camera",
    detail: "The site shows how Telex helps Mac users read at their own pace, with continuous scrolling, voice-level pacing, and navigable cues.",
    stack: "macOS · SwiftUI · Teleprompter", url: "https://telex-website-tau.vercel.app",
  },
  {
    name: "Previous Portfolio", image: "/media/portfolio.jpg", category: "Personal site / Archive",
    overview: "My portfolio as an interactive scrapbook",
    detail: "An earlier edition of this site, with editorial spreads, draggable details, and a book you can flip through.",
    stack: "Next.js · GSAP · Responsive design", url: "https://portfolio-two-gamma-2vsmutw02j.vercel.app",
    linkLabel: "Open archive",
  },
  {
    name: "Galaxy Glide", image: "/media/galaxy-glide.jpg", category: "Education / Interactive web",
    overview: "A playable tour of the solar system",
    detail: "Explore nine worlds, earn points, and answer questions as you fly through the solar system.",
    stack: "HTML · CSS · JavaScript", url: "https://galaxy-glide.vercel.app",
  },
  {
    name: "Miracle Website", image: "/media/miracle.jpg", category: "Native tools / Website",
    overview: "A home for my desktop file converter",
    detail: "Miracle converts images, video, audio, and documents on your computer. The site introduces the app and points to preview builds.",
    stack: "macOS · Windows · File conversion", url: "https://miracle-three-rho.vercel.app",
  },
  {
    ...previews[3], category: "Data / Sustainability",
    overview: "Forecasting a more sustainable grid",
    detail: "A case study on demand forecasting and adaptive power distribution, with an interactive energy-balance demo.",
    stack: "Forecasting · LSTM · Big data",
    url: "https://smart-energy-grid-app.vercel.app",
  },
  {
    name: "Llama 3.2 Finance QA", image: "/media/finance-qa.svg", category: "Language models / Research",
    overview: "Fine-tuning Llama for finance questions",
    detail: "I used LoRA to adapt Llama 3.2 3B Instruct and compared the fine-tuned model with the base model on held-out answers.",
    stack: "Llama 3.2 · LoRA · Evaluation", url: "https://github.com/ishuu9837/Fine-tuning-Llama-3.2",
    linkLabel: "View source", illustration: true,
  },
  {
    name: "Image Colourisation", image: "/media/colourisation.svg", category: "Computer vision / Research",
    overview: "Adding colour to grayscale images",
    detail: "A convolutional U-Net reconstructs colour in LAB colour space using CIFAR-10 and a VGG perceptual loss.",
    stack: "PyTorch · U-Net · CIFAR-10", illustration: true,
  },
];

export const toolkit = [
  { title: 'Data & analytics', items: [['Python',"/media/skills/python-original.svg"],['SQL',"/media/skills/azuresqldatabase-original.svg"],['NumPy',"/media/skills/numpy-original.svg"],['Pandas',"/media/skills/pandas-original.svg"],['PySpark',"/media/skills/apachespark.svg"],['Power BI',"/media/skills/powerbi.svg"]] },
  { title: 'Machine learning', items: [['PyTorch',"/media/skills/pytorch-original.svg"],['TensorFlow',"/media/skills/tensorflow-original.svg"],['Keras',"/media/skills/keras-original.svg"],['Scikit-learn',"/media/skills/scikitlearn-original.svg"],['Transformers',"/media/skills/huggingface.svg"]] },
  { title: 'Computer vision', items: [['OpenCV',"/media/skills/opencv-original.svg"]] },
  { title: 'Notebooks', items: [['Jupyter',"/media/skills/jupyter-original.svg"],['Google Colab',"/media/skills/googlecolab.svg"]] },
  { title: 'Web & interaction', items: [['JavaScript',"/media/skills/javascript-original.svg"],['HTML',"/media/skills/html5-original.svg"],['CSS',"/media/skills/css3.svg"],['React.js',"/media/skills/react.svg"],['Three.js',"/media/skills/threejs.svg"]] },
  { title: 'APIs & databases', items: [['Flask',"/media/skills/flask.svg"],['MongoDB',"/media/skills/mongodb-original.svg"],['MySQL',"/media/skills/mysql.svg"]] },
  { title: 'Cloud & development', items: [['Git',"/media/skills/git-original.svg"],['GitHub',"/media/skills/github.svg"],['Docker',"/media/skills/docker-original.svg"],['Vercel',"/media/skills/vercel.svg"],['AWS',"/media/skills/amazonwebservices-original-wordmark.svg"]] },
  { title: 'Design & visual tools', items: [['Figma',"/media/skills/figma.svg"],['Canva',"/media/skills/canva.svg"],['Photoshop',"/media/skills/photoshop.svg"]] },
  { title: 'AI assistants & agents', items: [
    ['Claude', '/media/skills/claude.svg'],
    ['Codex', '/media/skills/codex-terminal.svg'],
    ['Manus', '/media/skills/manus-hand.svg'],
    ['Cue Agents', '/media/skills/cue-agents.svg'],
  ] },
];

export const certifications: { title: string; issuer: string; result?: string; url: string; preview: string }[] = [
  { title: "Professional Certification in Data Science & AI", issuer: "IIT Roorkee via Intellipaat · 2025", result: "A Grade", url: "https://tih.iitr.ac.in/certificate/intellipaat/IPTIH25070775.jpg", preview: "data-science.jpg" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", url: "https://www.credly.com/badges/2f2ea326-f082-4302-adad-f97ff5e5eef4", preview: "cybersecurity.png" },
  { title: "Python Essentials 1", issuer: "Cisco", result: "100/100", url: "https://www.credly.com/badges/038d86bf-0279-4e10-9751-9c3c0a5c195e/linked_in_profile", preview: "python-1.png" },
  { title: "Python Essentials 2", issuer: "Cisco", result: "100/100", url: "https://www.credly.com/badges/2ebedeb7-139b-42af-ab17-7c387deb94d6/linked_in_profile", preview: "python-2.png" },
];

export const gallery = [
  { file: "city.webp", title: "A different perspective", alt: "Eswar overlooking the city and lake" },
  { file: "red-shirt.webp", title: "Little moments", alt: "Eswar in a burgundy shirt" },
  { file: "ride.webp", title: "Take the long way home", alt: "Eswar wearing a motorcycle helmet" },
  { file: "graduation.webp", title: "Graduation", alt: "Eswar at his Parul University graduation", cutout: true },
  { file: "escalade-v.webp", title: "Cadillac Escalade-V", alt: "Red Cadillac Escalade-V on a city street" },
  { file: "out-and-about.webp", title: "Out & about", alt: "Eswar in a checked shirt" },
];
