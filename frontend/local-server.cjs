const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Paths relative to frontend root
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const CONTENT_FILE = path.join(PUBLIC_DIR, 'content.json');

// Serve static files from public directory
app.use(express.static(PUBLIC_DIR));

// Ensure uploads dir exists
fs.ensureDirSync(UPLOADS_DIR);

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Upload Image
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const publicPath = `/uploads/${req.file.filename}`;
  console.log('File uploaded:', publicPath);
  res.json({ url: publicPath });
});

// Save Content
app.post('/api/save', async (req, res) => {
  try {
    const content = req.body;
    await fs.writeJson(CONTENT_FILE, content, { spaces: 2 });
    console.log('Content saved to content.json');
    res.json({ success: true });
  } catch (err) {
    console.error('Save failed:', err);
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Local dev server running on http://localhost:${PORT}`);
  console.log(`Serving uploads from: ${UPLOADS_DIR}`);
});
