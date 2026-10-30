const stack = (name: string) => `/personal/stack/${name}-original.svg`;
const icon = (name: string) => `/scrapbook/icons/${name}.svg`;
export const skillGroups = [
  { title: 'Data & analytics', items: [['Python',stack('python')],['SQL','/personal/stack/azuresqldatabase-original.svg'],['NumPy',stack('numpy')],['Pandas',stack('pandas')],['PySpark',icon('apachespark')],['Power BI',icon('powerbi')]] },
  { title: 'Machine learning', items: [['PyTorch',stack('pytorch')],['TensorFlow',stack('tensorflow')],['Keras',stack('keras')],['Scikit-learn',stack('scikitlearn')],['Transformers',icon('huggingface')]] },
  { title: 'Computer vision', items: [['OpenCV',stack('opencv')]] },
  { title: 'Notebooks', items: [['Jupyter',stack('jupyter')],['Google Colab','/personal/icons/googlecolab.svg']] },
  { title: 'Web & interaction', items: [['JavaScript',stack('javascript')],['HTML',stack('html5')],['CSS',icon('css3')],['React.js',icon('react')],['Three.js',icon('threejs')]] },
  { title: 'APIs & databases', items: [['Flask','/personal/icons/flask.svg'],['MongoDB',stack('mongodb')],['MySQL',icon('mysql')]] },
  { title: 'Cloud & development', items: [['Git',stack('git')],['GitHub',icon('github')],['Docker',stack('docker')],['Vercel',icon('vercel')],['AWS','/personal/stack/amazonwebservices-original-wordmark.svg']] },
  { title: 'Design & visual tools', items: [['Figma',icon('figma')],['Canva',icon('canva')],['Photoshop',icon('photoshop')]] },
];
export const research = [
  { title: 'Professional summary', tag: 'DATA SCIENCE · ENGINEERING', body: 'Data scientist, researcher and AI/ML engineer pursuing an M.Tech in Data Science at GITAM University, Hyderabad.', note: 'Data, models and useful applications' },
  { title: 'EduSentinel', tag: '01 / LEARNING BEHAVIOUR', body: 'An eight-feature, NumPy-only deep autoencoder for detecting unusual LMS learning behaviour. A Flask demonstration connects the model to an accessible research prototype.', note: 'Anomaly detection · Research case study' },
  { title: 'Smart Energy Grid', tag: '02 / ENERGY SYSTEMS', body: 'A demand-forecasting and adaptive grid-control concept. The proposed LSTM pipeline connects time-series forecasting with an interactive energy-balance demonstration.', note: 'Forecasting · Simulation' },
  { title: 'Real-Time Face Detection', tag: '03 / COMPUTER VISION', body: 'A Python and OpenCV pipeline for live face detection, with MongoDB for stored face records. Documented as a research project in December 2024.', note: 'OpenCV · Python · MongoDB' },
  { title: 'HarkPro / Artifacts', tag: '04 / PRODUCT DESIGN', body: 'A design case study for keeping generated files and revisions beside a chat. Explores version comparison, source-message links and downloads with fictional demonstration data.', note: 'Independent frontend concept' },
];
export const projects = [
  {
    "name": "EduSentinel",
    "tech": "ANOMALY DETECTION",
    "points": [
      "NumPy-only deep autoencoder using eight LMS features.",
      "Flags abnormal learning behaviour in education data.",
      "Flask demonstration with findings published on ResearchGate."
    ],
    "url": "https://edusentinel.vercel.app"
  },
  {
    "name": "Heart Disease Prediction",
    "tech": "MEDICAL AI",
    "points": [
      "Deep autoencoder for the UCI Heart Disease dataset.",
      "Threshold tuning and class-imbalance handling.",
      "Dropout and L1/L2 regularisation support model training."
    ],
    "url": "https://github.com/ishuu9837"
  },
  {
    "name": "Image Colourisation",
    "tech": "COMPUTER VISION",
    "points": [
      "U-Net convolutional autoencoder in LAB colour space.",
      "CIFAR-10 experiments with VGG perceptual loss.",
      "Three architecture iterations; TensorFlow to PyTorch migration."
    ],
    "url": "https://github.com/ishuu9837"
  },
  {
    "name": "Smart Energy Grid",
    "tech": "BIG DATA / SUSTAINABILITY",
    "points": [
      "Case study of data-driven demand forecasting.",
      "Proposed pipeline links forecasting to adaptive grid control.",
      "Interactive energy-balance demo supports the case study."
    ],
    "url": "https://smart-energy-grid-app.vercel.app"
  },
  {
    "name": "MRS by Letterboxd",
    "tech": "RECOMMENDATION SYSTEMS",
    "points": [
      "Python backend encodes genres and ranks by cosine similarity.",
      "Title, language, year and genre filters link users to Letterboxd.",
      "Browser-side filtering remains available as a fallback."
    ],
    "url": "https://movie-recommendation-using-letterbo.vercel.app"
  },
  {
    "name": "Real-Time Face Detection",
    "tech": "COMPUTER VISION / DATA",
    "points": [
      "Python and OpenCV implement the detection pipeline.",
      "MongoDB stores the detected faces.",
      "Findings published on ResearchGate in December 2024."
    ],
    "url": "https://github.com/ishuu9837/REAL-TIME-FACE-DETECTION"
  }
];
export const chapters = ['About', 'Skills', 'Research', 'Apps', 'Projects', 'Journey', 'Happiness'];
