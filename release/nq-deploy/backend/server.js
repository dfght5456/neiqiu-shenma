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

// Paths
const FRONTEND_PUBLIC_DIR = path.join(__dirname, '../frontend/public');
const UPLOADS_DIR = path.join(FRONTEND_PUBLIC_DIR, 'uploads');
const CONTENT_FILE = path.join(FRONTEND_PUBLIC_DIR, 'content.json');

// Ensure uploads dir exists
fs.ensureDirSync(UPLOADS_DIR);

// Serve uploads statically (for Nginx proxy to backend /uploads)
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    // Keep original name but prepend timestamp to avoid collisions
    // Or just keep original name if we want to overwrite
    // Let's use timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- API Endpoints ---

// Upload Image
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Return the path relative to the public root
  const publicPath = `/uploads/${req.file.filename}`;
  res.json({ url: publicPath });
});

// Get Content
app.get('/api/content', async (req, res) => {
  try {
    if (await fs.pathExists(CONTENT_FILE)) {
      const content = await fs.readJson(CONTENT_FILE);
      res.json(content);
    } else {
      res.status(404).send('Content file not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Save Content
app.post('/api/content', async (req, res) => {
  try {
    const content = req.body;
    await fs.writeJson(CONTENT_FILE, content, { spaces: 2 });
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${UPLOADS_DIR}`);
});
